
ko.bindingHandlers.kendoComboBox = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var value = valueAccessor(),
            allBindings = allBindingsAccessor(),
            currentModelValue = ko.utils.unwrapObservable(value),
            dd = $(element).data('kendoComboBox') ||
                $(element).kendoComboBox({
                    dataSource: allBindings.source()
                }).data('kendoComboBox');

        dd.value(currentModelValue);
        allBindings.source.subscribe(function (options) {
            // console.log(options, dd);
            dd.dataSource.data(options);
        });
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
            $(element).data('kendoComboBox').value(modelValue);
        }
    }
};