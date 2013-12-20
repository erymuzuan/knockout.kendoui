

define([],
function () {
    
    var arrayTypeNamePattern = /\[/,
        toObservable = function (item, namespacePattern) {
            if (typeof item === "function") return item;
            if (typeof item === "number") return item;
            if (typeof item === "string") return item;
            if (typeof item.$type === "undefined") return item;
            if (_(item.$type).isNull()) return item;

            var pattern = namespacePattern || /Bespoke\.Sph\.Domain\.(.*?),/,
                $typeFieldValue = item.$type,
                type = "",
                partial = null;

            if (typeof item.$type === "function") {
                $typeFieldValue = item.$type();
            }
            if (typeof $typeFieldValue === "string") {
                var bespokeTypeMatch = pattern.exec($typeFieldValue);
                if (bespokeTypeMatch) {
                    type = bespokeTypeMatch[1];
                } else {
                    return item;
                }
            }

            for (var name in item) {
                (function (prop) {

                    var _propertyValue = _(item[prop]);

                    if (_propertyValue.isArray()) {

                        var children = _propertyValue.map(function (x) {
                            return toObservable(x, pattern);
                        });

                        item[prop] = ko.observableArray(children);
                        return;
                    }

                    if (_propertyValue.isNumber()
                        || _propertyValue.isNull()
                        || _propertyValue.isNaN()
                        || _propertyValue.isDate()
                        || _propertyValue.isBoolean()
                        || _propertyValue.isString()) {
                        item[prop] = ko.observable(item[prop]);
                        return;
                    }

                    if (_propertyValue.isObject()) {
                        var $typeFieldValue2 = item[prop].$type;

                        if ($typeFieldValue2 && arrayTypeNamePattern.exec($typeFieldValue2)) {
                            if (_(item[prop].$values).isArray()) {
                                var childItems = _(item[prop].$values).map(function (v) {
                                    return toObservable(v, pattern);
                                });
                                item[prop] = ko.observableArray(childItems);
                            }
                            return;
                        }

                        var child = toObservable(item[prop], pattern);
                        item[prop] = ko.observable(child);
                        return;
                    }

                })(name);

            }

            if (bespoke.sph.domain[type + "Partial"]) {
                partial = new bespoke.sph.domain[type + "Partial"](item);
            }
            if (partial) {
                // NOTE :copy all the partial, DO NO use _extend as it will override the original value 
                // if there is item with the same key
                for (var prop1 in partial) {
                    if (!item[prop1]) {
                        item[prop1] = partial[prop1];
                    }
                }
            }

            // if there are new fields added, chances are it will not be present in the json,
            // even it is, it would be nice to add WebId for those that are still missing one

            if (bespoke.sph.domain[type]) {
                var ent = new bespoke.sph.domain[type](system.guid());
                for (var prop2 in ent) {
                    if (!item[prop2]) {
                        item[prop2] = ent[prop2];
                    }
                }
            }
            return item;

        };


    return {
        toObservable: toObservable
    };

  
});