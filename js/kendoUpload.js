
ko.bindingHandlers.kendoUpload = {
    init: function (element, valueAccessor) {
        var context = require(objectbuilders.datacontext),
             logger = require(objectbuilders.logger),
            value = valueAccessor();
        $(element).attr("name", "files").kendoUpload({
            async: {
                    // TODO : define your upload url here
                saveUrl: "/BinaryStore/Upload",
                    // TODO : define your remove url here
                removeUrl: "/BinaryStore/Remove",
                autoUpload: true
            },
            multiple: false,
            error: function (e) {
                logger.logError(e, e, this, true);
            },
            success: function (e) {
                logger.info('Your file has been ' + e.operation);

                var storeId = e.response.storeId,
                    uploaded = e.operation === "upload",
                    removed = e.operation != "upload",
                    oldFile = value();
                if (uploaded) {
                    value(storeId);
                    if (oldFile) {
                        // TODO : define your remove url here
                        context.post(JSON.stringify({ id: oldFile }), "/BinaryStore/Remove/");
                    }
                }
                if (removed) {
                    value("");
                }
            },
            remove: function () {
                var tcs = new $.Deferred(),
                    data = JSON.stringify({ id: value() });
                    // TODO : define your remove url here
                    context.post(data, "/BinaryStore/Remove/")
                        .then(function (result) {
                            tcs.resolve(result);
                        });
                    return tcs.promise();
            }
        });
    }
};