IdleMeNot.DayController = Ember.ObjectController.extend({
    newTask: null,
    date: function () {
        return DateUtils.dateFromDateString(this.get('model.date'));
    }.property('model.date'),
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
    }.observes('newTask.description'),
    actions: {
        save: function () {
            var day = this.get('model');
            Ember.RSVP.all(this.get('tasks').map(function (task) {
                return task.save(); // task.get('description') ? task.save() : Ember.RSVP.resolve();
            })).then(function () {
                day.save();
            });
        },
        undo: function () {
            this.get('model').rollback();
        }
    }
});