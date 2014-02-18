/// <reference path="utils.ts" />
/// <reference path="spec.ts" />
/// <reference path="adapters/specialized_localstorage_adapter.ts" />

$(window).load(() => {
    var tasks: any = $('#tasks');
    tasks.mCustomScrollbar({
        advanced: {
            updateOnContentResize: true
        }
    });
});

var IdleMeNot = Ember.Application.create();

IdleMeNot.Store = DS.Store.extend({
    findFirst: function (type, idOrQuery) {
        return this.find(type, idOrQuery).then(
            results => results.get('firstObject')
        );
    }
});