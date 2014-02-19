IdleMeNot.DayController = Ember.ObjectController.extend({
    newTask: null,
    _tasksInitialized: function () {
        var task = this.store.createRecord('task', { completed: false });
        this.set('newTask', task);
        this.get('tasks').addObject(task);
        this.removeObserver('tasks', this, this._tasksInitialized);
    }.observes('tasks'),
    _newTaskDescription: function () {
        var task = this.get('newTask');
        if (task.get('description')) {
            task = this.store.createRecord('task', { completed: false });
            this.set('newTask', task);
            this.get('tasks').addObject(task);
        }
    }.observes('newTask.description')
});