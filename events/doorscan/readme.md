# Event Door Scanner

A ticket and door-scanning setup for an event where each registrant brings guests.

### The ask

> We want every graduating senior to register and tell us how many guests. Allow the ticket to be scanned in as many times as there are guests.
>
> Commencement Planning Committee
 
### Student Experience
![image](https://github.com/lloydlentz/slate-tips/assets/223836/2788d1e9-8c6a-4bff-8926-9e2d5f71e48c)

### Door scanner
![image](https://github.com/lloydlentz/slate-tips/assets/223836/3efde3a3-4156-4c28-933c-ae4c57c280ee)

### Components

- **Ticket**, linked in the confirmation email as `{{slate base}}/portal/public/?cmd=customticket&reg={{FormResponseGUID}}`
  - [View](ticket.html)
  - [Query](ticket_query.md)
- **Door scanner**
  - [View](doorscan.html)
  - [Query](doorscan.sql)
