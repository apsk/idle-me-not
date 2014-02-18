function SpecializedLocalstorageAdapter(type) {
    return DS.Adapter.extend({
        generateIdForRecord: function () {
            var idKey = type + '_id';
            var idString = localStorage.getItem(idKey) || '0';
            var id = parseInt(idString);
            localStorage.setItem(idKey, (id + 1).toString());
            return id;
        },
        find: function (_store, _type, id) {
            return Ember.RSVP.resolve(JSON.parse(localStorage.getItem(type + '_' + id)));
        },
        findMany: function (_store, _type, ids) {
            return Ember.RSVP.resolve(ids.map(function (id) {
                return JSON.parse(localStorage.getItem(type + '_' + id));
            }));
        },
        findAll: function (store) {
            return this.findMany(store, type, JSON.parse(localStorage.getItem(type + '_ids') || '[]'));
        },
        findQuery: function (store, _type, query) {
            return this.findAll(store, type).then(function (array) {
                return array.filter(function (record) {
                    for (var key in query) {
                        if (!query.hasOwnProperty(key)) {
                            continue;
                        }
                        var value = query[key];
                        if (record[key] !== value) {
                            return false;
                        }
                    }
                    return true;
                });
            });
        },
        createRecord: function (_store, _type, record) {
            var idsKey = type + '_ids';
            localStorage.setItem(idsKey, '[' + record.id + (localStorage.getItem(idsKey) || '[]').slice(1));
            localStorage.setItem(type + '_' + record.id, JSON.stringify(record));
            return Ember.RSVP.resolve();
        },
        updateRecord: function (_store, _type, record) {
            localStorage.setItem(type + '_' + record.id, JSON.stringify(record));
            return Ember.RSVP.resolve();
        },
        deleteRecord: function (_store, _type, record) {
            var idsKey = type + '_ids';
            var ids = JSON.parse(localStorage.getItem(idsKey));
            ids.splice(ids.indexOf(record.id), 1);
            localStorage.setItem(idsKey, JSON.stringify(ids));
            localStorage.removeItem(type + '_' + record.id);
            return Ember.RSVP.resolve();
        }
    });
}