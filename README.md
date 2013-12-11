knockout.kendoui
================

Some knockoutjs custom binding for kendoUI
Plese look at the js folder

## kendoDate

kendoDate requires momentjs, and your date is the YYYY-MM-DD format, not the Json datetime or javascript datetime
```javascript
    // sample
    var vm = {
        date : ko.observable('2013-05-05'),
        // other members
    };

```html
    // HTML
    <input type="text" data-bind="kendoDate: date" />


##kendoDateTime
This is similiar to kendoDate in many aspects except it will use kendoDateTimePicker for your input
```javascript 
	var vm = {
	dateTime : ko.observable('2013-05-05T18:00:00')
};

##kendoUpload
This is one of the most flexible one available in kendoUI, there are too many ways to configure it, I haven't gone a great deal to make as extensible as I could just take the middle road for ease of use

```javascript 
	var vm = {
		filePath : ko.observable(),
		///
};
	<input type="file" name="files" id="files" data-bind="kendoUpload : your_path"/>
```

and on your server, in this case I'm using C# (ASP.Net MVC), you can have anything you want and comfortable with
```csharp
   public async Task<ActionResult> Upload(IEnumerable<HttpPostedFileBase> files)
        {

            var storeId = Guid.NewGuid().ToString();

            foreach (var file in files)
            {
                var fileName = Path.GetFileName(file.FileName);
                var extension = Path.GetExtension(file.FileName) ?? "";
                byte[] content;
             
	            var stream = file.InputStream;  //initialise new stream
	            content = new byte[stream.Length];
	            stream.Read(content, 0, content.Length); // read from stream to byte array

	            // TODO, save your content here, anywhere, database , file system

            }

            return Json(new { storeId });
        }

