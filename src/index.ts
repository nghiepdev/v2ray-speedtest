import http from 'node:http';
import {serve, text, send} from 'micro';
import bytes from 'bytes';

import {speedtest} from './speedtest';

import type {
  PairInfoString,
  ProxyServer,
  GotPing,
  GotSpeed,
  ProxyServerTest,
} from './typing';

const PORT = process.env.PORT || 4000;

const server = new http.Server(
  serve(async (req, res) => {
    const url = new URL(req.url ?? '', `http://${req.headers.host}`);
    let proxy = decodeURIComponent(
      url.pathname.replace(/^\//, '') + url.search
    );

    if (req.method === 'POST') {
      proxy = (await text(req)) || proxy;
    }

    // Validate proxy before use
    new URL(proxy);

    const lines: string[] = ((await speedtest(proxy)) ?? '').split('\n');

    const {servers} = JSON.parse(
      lines
        .find(line =>
          line.includes(`\"info\":\"gotservers\"` satisfies PairInfoString)
        )
        ?.match(/{.*}/)
        ?.at(0) ?? ''
    ) as {
      servers: ProxyServer[];
    };

    const gotpings: GotPing[] = lines
      .filter(line =>
        line.includes(`\"info\":\"gotping\"` satisfies PairInfoString)
      )
      .map(gotping => JSON.parse(gotping.match(/{.*}/)?.at(0) ?? ''));

    const gotspeeds: GotSpeed[] = lines
      .filter(line =>
        line.includes(`\"info\":\"gotspeed\"` satisfies PairInfoString)
      )
      .map(gotping => JSON.parse(gotping.match(/{.*}/)?.at(0) ?? ''));

    const result = servers.map(({id, remarks, protocol}) => {
      const gotspeed = gotspeeds.reduce(
        (acc, {speed, maxspeed}) => {
          return {
            ...acc,
            speed: acc.speed + bytes.parse(speed),
            maxspeed: acc.maxspeed + bytes.parse(maxspeed),
          };
        },
        {
          speed: 0,
          maxspeed: 0,
        } satisfies {speed: number; maxspeed: number}
      );
      return {
        remarks,
        protocol,
        ping: gotpings.find(gotping => gotping.id === id)?.ping ?? 0,
        speed: bytes.format(gotspeed.speed / (gotspeeds.length ?? 1)),
        maxspeed: bytes.format(gotspeed?.maxspeed / (gotspeeds.length ?? 1)),
      } satisfies ProxyServerTest;
    });

    return send(res, 200, {
      servers: result,
    });
  })
);

server.listen(PORT, () => {
  console.info(`⚡⚡⚡ Listening on http://localhost:${PORT}`);
});
