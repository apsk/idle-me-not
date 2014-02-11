/// <reference path="utils.ts" />
/// <reference path="spec.ts" />
/// <reference path="adapters/localstorage_adapter.ts" />

var IdleMeNot = Ember.Application.create();

IdleMeNot.Store = DS.Store.extend({
    adapter: LocalstorageAdapter,
    findFirst: function (type, idOrQuery) {
        return this.find(type, idOrQuery).then(
            results => results.get('firstObject')
        );
    }
});