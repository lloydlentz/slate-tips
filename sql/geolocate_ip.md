# Get Geolocation from an IP Address

Slate has a built-in IP lookup table function. Use it in Custom SQL:

```sql
(select [city] from world.dbo.getiplocation(@ip_address))
```

Replace `@ip_address` with the column or parameter that holds the IP.

_Credit: Jamie Davis, University of Michigan ([Slate Community Slack](https://slate-users.slack.com/archives/CFUUKHULW/p1629296632070700?thread_ts=1629296139.070600&cid=CFUUKHULW))._
