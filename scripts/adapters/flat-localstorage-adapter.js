var FlatLocalstorageAdapter = DS.Adapter.extend({
    find: function (store, type, id) {
        return Em.RSVP.resolve(JSON.parse(localStorage.getItem(type + '_' + id)));
    },
    findMany: function (store, type, ids) {
        return Em.RSVP.resolve(ids.map(function (id) {
            return JSON.parse(localStorage.getItem(type + '_' + id));
        }));
    },
    findAll: function (store, type) {
        return this.findMany(store, type, JSON.parse(localStorage.getItem(type + '_ids') || '[]'));
    },
    findQuery: function (store, type, query) {
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
    createRecord: function (store, type, record) {
        var idKey = type + '_id';
        var idString = localStorage.getItem(idKey) || '1';
        var id = parseInt(idString);
        var idsKey = type + '_ids';
        var ids = JSON.parse(localStorage.getItem(idsKey) || '[]');
        ids.push(id);
        record.set('id', idString);
        localStorage.setItem(idKey, (id + 1).toString());
        localStorage.setItem(idsKey, JSON.stringify(ids));
        localStorage.setItem(type + '_' + id, JSON.stringify(
            record.serialize({ includeId: true })
        ));
        return Em.RSVP.resolve();
    },
    updateRecord: function (store, type, record) {
        localStorage.setItem(type + '_' + record.id, JSON.stringify(
            record.serialize({ includeId: true }))
        );
        return Em.RSVP.resolve();
    },
    deleteRecord: function (store, type, record) {
        var idsKey = type + '_ids';
        var ids = JSON.parse(localStorage.getItem(idsKey));
        ids.splice(ids.indexOf(record.id), 1);
        localStorage.setItem(idsKey, JSON.stringify(ids));
        localStorage.removeItem(type + '_' + record.id);
        return Em.RSVP.resolve();
    }
});