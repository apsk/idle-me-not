/// <reference path="../application.ts" />

IdleMeNot.DayController = Ember.ObjectController.extend({
    newTask: null,
    _tasksInitialized: function () {
        var newTask = this.store.createRecord('task', { completed: false });
        this.set('newTask', newTask);
        this.get('tasks').addObject(newTask);
        this.removeObserver('tasks', this, this._tasksInitialized);
    }.observes('tasks'),
    _newTaskDescription: function () {
        var newTask = this.get('newTask');
        if (newTask.get('description')) {
            var newTask = this.store.createRecord('task', { completed: false });
            this.set('newTask', newTask);
            this.get('tasks').addObject(newTask);
        }
    }.observes('newTask.description')
});