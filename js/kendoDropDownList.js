

ko.bindingHandlers.kendoDropDownList  = {
    init: function (element, valueAccessor) {
        var value = valueAccessor();
        var currentModelValue = ko.utils.unwrapObservable(value);
        var dd = $(element).data('kendoDropDownList');
        dd.value(currentModelValue);

        dd.bind("change", function () {
            var nv = dd.value();
            value(nv);
        });
    },

    update: function (element, valueAccessor) {
        //update value based on a model change
        var value = valueAccessor();
        var modelValue = ko.utils.unwrapObservable(value);

        if (modelValue) {
            $(element).data('kendoDropDownList').value(modelValue);
        }
    }
};
