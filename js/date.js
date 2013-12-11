
///user moment format
ko.bindingHandlers.date = {
    init: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            dv = ko.unwrap(value.value),
            date = moment(dv),
            invalid = ko.unwrap(value.invalid) || 'invalid date';

        $(element).on("change", function () {
            var nv = $(this).val();
            value.value(nv);
        });
        if (!dv) {
            $(element).text(invalid);
            $(element).val(invalid);
            return;
        }
        if (!date) {
            $(element).text("");
            $(element).val("");
            return;
        }
        if (date.year() == 1) { // DateTime.Min
            $(element).text("");
            $(element).val("");
            return;
        }


        var dateString = date.format(value.format).toString();
        if (dateString.indexOf("NaN") < 0) {
            $(element).text(dateString);
            $(element).val(dateString);
        }



    }
};
