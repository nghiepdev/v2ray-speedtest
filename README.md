# V2RAY-SPEEDTEST
Speed test ss/ssr/v2ray/trojan servers


## Docker
```bash
$ docker run -p 10888:3000 nghiepit/v2ray-speedtest
```


## Usage

```curl
$ curl https://your.domain.com/https://4g.mkvn.net/api/v1/client/subscribe?token=c1021d8bc7bed367d0d7301086d0d056
```

``` curl
$ curl --location 'https://your.domain.com' \
--data 'vmess://eyJhbHRlcklkIjoiMCIsInB=='
```

## Credits
- [LiteSpeedTest](https://github.com/xxf098/LiteSpeedTest)
