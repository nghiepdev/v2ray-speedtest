# V2RAY-SPEEDTEST

Speed test ss/ssr/v2ray/trojan servers

## Docker

```bash
$ docker run -p 10888:4000 nghiepit/v2ray-speedtest
```

## Usage

```curl
$ curl https://yourdomain.com/https://4g.mkvn.net/api/v1/client/subscribe?token=c1021d8bc7bed367d0d7301086d0d056
```

```curl
$ curl -X PORT 'https://yourdomain.com' \
--data 'vmess://eyJhbHRlcklkIjoiMCIsInB=='
```

## Credits

- [LiteSpeedTest](https://github.com/xxf098/LiteSpeedTest)
