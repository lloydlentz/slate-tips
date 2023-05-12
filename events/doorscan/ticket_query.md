## Ticcket Configurable Joins Query

_Query in PUBLIC portal_

## Base
Form Response (all)

## Joins
 - Person
 - Form

## Parameters
`<param id="reg" type="UNIQUEIDENTIFIER" />`

## Exports
 - **last** : Person Last
 - **first** : Person Firs
 - **guid** : Form Response Guid
 - **guests** : Form Response Guests
 - **start** : Form Start Date
 - **location** : Form Location
 - **title** : Form Title

## Filters
 - **GUID** : `@FormResponseGUID = @reg`
