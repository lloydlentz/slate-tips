# Ticket Query (Configurable Joins)

The query behind the [ticket view](ticket.html). It lives in a **public** portal.

**Base:** Form Response (all)

**Joins:** Person, Form

**Parameters:**

```xml
<param id="reg" type="UNIQUEIDENTIFIER" />
```

**Exports:**

| Export | Field |
|--------|-------|
| `last` | Person Last |
| `first` | Person First |
| `guid` | Form Response GUID |
| `guests` | Form Response Guests |
| `start` | Form Start Date |
| `location` | Form Location |
| `title` | Form Title |

**Filters:** Form Response GUID = `@reg`
