export const SpeedTestInfoType = ['gotservers', 'gotping', 'gotspeed'] as const;

export type PairInfoString =
  `\"info\":\"${(typeof SpeedTestInfoType)[number]}\"`;

export interface ProxyServer {
  id: number;
  info: (typeof SpeedTestInfoType)[number];
  remarks: string;
  server: string;
  group: string;
  link: string;
  protocol: string;
}

export interface GotPing {
  id: number;
  info: (typeof SpeedTestInfoType)[number];
  ping: number;
  lost: `${number}%`;
}
export interface GotSpeed {
  id: number;
  info: (typeof SpeedTestInfoType)[number];
  speed: string;
  maxspeed: string;
}

export type ProxyServerTest = Pick<ProxyServer, 'remarks' | 'protocol'> &
  Pick<GotPing, 'ping'> &
  Pick<GotSpeed, 'speed' | 'maxspeed'>;
