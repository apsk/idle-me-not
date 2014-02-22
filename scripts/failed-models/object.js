IdleMeNot.Object = Ember.Object.extend({
    save: function () {
        var type = this.constructor.type;
        var idKey = type + '_id';
        var idString = localStorage.getItem(idKey) || '0';
        var id = parseInt(idString);
        var idsKey = type + '_ids';
        var ids = JSON.parse(localStorage.getItem(idsKey) || '[]');
        ids.push(id);
        this.set('id', id);
        localStorage.setItem(idKey, (id + 1).toString());
        localStorage.setItem(idsKey, JSON.stringify(ids));
        localStorage.setItem(type + '_' + id, JSON.stringify(this.serialize()));
    }
});

IdleMeNot.Object.reopenClass({
    find: function (query) {
        var self = this;
        var ids = JSON.parse(localStorage.getItem(self.type + '_ids') || '[]');
        for (var i = 0; i < ids.length; ++i) {
            var record = JSON.parse(localStorage.getItem(self.type + '_' + ids[i]));
            if (self._satisfiesQuery(record, query))
                return self.extract(record);
        }
        return null;
    },
    findAll: function (query) {
        var self = this;
        var ids = JSON.parse(localStorage.getItem(self.type + '_ids') || '[]');
        var records = ids.map(function (id) {
            return JSON.parse(localStorage.getItem(self.type + '_' + id));
        });
        return records.filter(function (record) {
            return self._satisfiesQuery(record, query);
        }).map(function (record) {
            return self.extract(record);
        });
    },
    fieldSerializer: function (fields) {
        return function (self) {
            self = self || this;
            var data = {};
            fields.forEach(function (key) {
                data[key] = self.get(key);
            });
            return data;
        };
    },
    _satisfiesQuery: function (record, query) {
        for (var key in query) {
            if (!query.hasOwnProperty(key)) continue;
            var value = query[key];
            if (record[key] !== value) return false;
        }
        return true;
    }
});
