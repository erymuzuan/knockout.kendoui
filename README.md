knockout.kendoui
================

Some knockoutjs custom binding for kendoUI
Plese look at the js folder

## kendoDate

kendoDate requires momentjs, and your date is the YYYY-MM-DD format, not the Json datetime or javascript datetime
```javascript
    // sample
    var vm = {
        date : '2013-05-05',
        // other members
    };

```html
    // HTML
    <input type="text" data-bind="kendoDate: date" />



