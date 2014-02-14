/// <reference path="../application.ts" />

IdleMeNot.DayController = Ember.ObjectController.extend({
    init: function () {
        this.set('newTask', this.store.createRecord('task', { completed: false }));
    },
    _newTaskDescription: function () {
        var task = this.get('newTask');
        if (!task.get('description')) return;
        this.get('tasks').addObject(task);
        this.set('newTask', this.store.createRecord('task', { completed: false }));
    }.observes('newTask.description').on('init')
});