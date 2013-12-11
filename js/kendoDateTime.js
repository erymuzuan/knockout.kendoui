

// requires momentjs loaded
ko.bindingHandlers.kendoDateTime = {
    init: function (element, valueAccessor) {
        var value = valueAccessor(),
            $input = $(element),
            currentValue = ko.utils.unwrapObservable(value),
            date = moment(currentValue),
            changed = function (e) {
                console.log(e);
                var nv = this.value();
                if (typeof nv == "string") {
                    date = moment(nv, "DD/MM/YYYY hh:mm");
                } else {
                    date = moment(nv);
                }
                // DO NOT fire update
                $input.data("stop", "true");
                value(date.format());
                $input.data("stop", "false");

            },
            picker = $input.kendoDateTimePicker({ format: "dd/MM/yyyy HH:mm", change: changed }).data("kendoDateTimePicker");

        if (!date) {
            picker.value(null);
            return;
        }

        if (date.year() === 1) { // DateTime.Min
            picker.value(null);
            return;
        }

        picker.value(date.toDate());
    },
    update: function (element, valueAccessor) {
        var $input = $(element);
        if ($input.data("stop") == "true") return;

        var value = valueAccessor(),
            modelValue = ko.utils.unwrapObservable(value),
            date = moment(modelValue),
            picker = $input.data("kendoDateTimePicker");

        if (!date) {
            picker.value(null);
            return;
        }
        if (date.year() == 1) { // DateTime.Min
            picker.value(null);
            return;
        }

        picker.value(date.toDate());

    }
};
