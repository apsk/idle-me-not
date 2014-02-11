/// <reference path="../../typings/ember/ember.d.ts" />

var LocalstorageAdapter = DS.Adapter.extend({
    find: function(store, type, id) {
        return Ember.RSVP.resolve(localStorage.getItem(type + '_' + id));
    },
    findMany: function(store, type, ids) {
        return Ember.RSVP.resolve(ids.map(id => localStorage.getItem(type + '_' + id)));
    },
    findAll: function(store, type) {
        return this.findMany(store, type, JSON.parse(localStorage.getItem(type + '_ids')));
    },
    findQuery: function(store, type, query) {
        return this.findAll(store, type).filter(function(record) {
            for(var key in query) {
                if (!query.hasOwnProperty(key)) { continue; }
                var value = query[key];
                if (record[key] !== value) { return false; }
            }
            return true;
        });
    },
    createRecord: function(store, type, record) {
        var idKey = type + '_id';
        var idsKey = type + '_ids';
        var idString = localStorage.getItem(idKey) || '0';
        var id = parseInt(idString);
        localStorage.setItem(idsKey, '[' + idString + localStorage.getItem(idsKey).slice(1));
        localStorage.setItem(idKey, (id + 1).toString());
        record.id = id;
        localStorage.setItem(type + '_' + id, JSON.stringify(record));
        return Ember.RSVP.resolve();
    },
    updateRecord: function(store, type, record) {
        localStorage.setItem(type + '_' + record.id, JSON.stringify(record));
        return Ember.RSVP.resolve();
    },
    deleteRecord: function(store, type, record) {
        var idsKey = type + '_ids';
        var ids: number[] = JSON.parse(localStorage.getItem(idsKey));
        ids.splice(ids.indexOf(record.id), 1);
        localStorage.setItem(idsKey, JSON.stringify(ids));
        localStorage.removeItem(type + '_' + record.id);
        return Ember.RSVP.resolve();
    }
});
