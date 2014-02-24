$(window).load(function () {
    $('#tasks').mCustomScrollbar({
        advanced: {
            updateOnContentResize: true
        }
    });
});

// fix https://github.com/emberjs/data/pull/1494
DS.JSONSerializer.reopen({
    serializeHasMany: function (record, json, relationship) {
        var key = relationship.key;
        var relationshipType = DS.RelationshipChange.determineRelationshipType(record.constructor, relationship);
        if (relationshipType === 'manyToOne' || relationshipType === 'manyToMany') {
            json[key] = Em.get(record, key).mapBy('id').without(null);
        }
    },
    serializeBelongsTo: Em.K
});

var IdleMeNot = Em.Application.create();

IdleMeNot.ApplicationAdapter = FlatLocalstorageAdapter.extend();

IdleMeNot.Store = DS.Store.extend({
    findFirst: function (type, idOrQuery) {
        return this.find(type, idOrQuery).then(function (results) {
            return results.get('firstObject');
        });
    }
});