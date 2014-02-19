IdleMeNot.TaskController = Ember.ObjectController.extend({
    emptyDescription: function () {
        return this.get('model.description') == '';
    }.property('model.description')
});