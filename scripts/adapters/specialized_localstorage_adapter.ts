/// <reference path="../../typings/ember/ember.d.ts" />

function SpecializedLocalstorageAdapter(type: string): DS.Adapter { return DS.Adapter.extend({
    generateIdForRecord: function (_store) {
        var idKey = type + '_id';
        var idString = localStorage.getItem(idKey) || '0';
        var id = parseInt(idString);
        localStorage.setItem(idKey, (id + 1).toString());
        return id;
    },
    find: (store, type, id) =>
        Ember.RSVP.resolve(JSON.parse(localStorage.getItem(type + '_' + id))),
    findMany: (store, type, ids) =>
        Ember.RSVP.resolve(ids.map(id => JSON.parse(localStorage.getItem(type + '_' + id)))),
    findAll: function (store, type) {
        return this.findMany(store, type, JSON.parse(localStorage.getItem(type + '_ids') || '[]'));
    },
    findQuery: function (store, type, query) {
        return this.findAll(store, type).then(array =>
                array.filter(record => {
                    for(var key in query) {
                        if (!query.hasOwnProperty(key)) { continue; }
                        var value = query[key];
                        if (record[key] !== value) { return false; }
                    }
                    return true;
                })
        );
    },
    createRecord: (_store, _type, record) => {
        var idsKey = type + '_ids';
        localStorage.setItem(idsKey, '[' + record.id + (localStorage.getItem(idsKey) || '[]').slice(1));
        localStorage.setItem(type + '_' + record.id, JSON.stringify(record));
        return Ember.RSVP.resolve();
    },
    updateRecord: (store, type, record) => {
        localStorage.setItem(type + '_' + record.id, JSON.stringify(record));
        return Ember.RSVP.resolve();
    },
    deleteRecord: (store, type, record) => {
        var idsKey = type + '_ids';
        var ids: number[] = JSON.parse(localStorage.getItem(idsKey));
        ids.splice(ids.indexOf(record.id), 1);
        localStorage.setItem(idsKey, JSON.stringify(ids));
        localStorage.removeItem(type + '_' + record.id);
        return Ember.RSVP.resolve();
    }
});}
