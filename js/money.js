
ko.bindingHandlers.money = {
    init: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        var money = parseFloat(value).toFixed(2);

        $(element).text(money);
        $(element).val(money);

        $(element).on("change", function () {
            var nv = $(this).val();
            value.text(nv);
        });
    },
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        var money = parseFloat(value).toFixed(2);

        $(element).text(money);
        $(element).val(money);
    }
};
