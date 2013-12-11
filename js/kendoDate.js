

//NOTE : this requried momentjs to be loaded moment format
ko.bindingHandlers.kendoDate = {
    init: function (element, valueAccessor) {
        var value = valueAccessor(),
            $input = $(element),
            currentValue = ko.utils.unwrapObservable(value),
            date = moment(currentValue),
            changed = function (e) {
                console.log(e);
                var nv = this.value();
                if (typeof nv == "string") {
                    date = moment(nv, "DD/MM/YYYY");
                } else {
                    date = moment(nv);
                }
                // DO NOT fire update
                $input.data("stop", "true");
                value(date.format("YYYY-MM-DD"));
                $input.data("stop", "false");

            },
            picker = $input.kendoDatePicker({ format: "dd/MM/yyyy", change: changed }).data("kendoDatePicker");

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
            picker = $input.data("kendoDatePicker");

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

