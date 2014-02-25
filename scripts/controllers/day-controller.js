IdleMeNot.DayController = Em.ObjectController.extend({
    newTask: null,

    date: function () {
        return DateUtils.dateFromDateString(this.get('model.date'));
    }.property('model.date'),

    _tasksInitialized: function () {
        this.get('tasks').then(function (tasks) {
            var task = this.store.createRecord('task', { completed: false });
            this.set('newTask', task);
            tasks.addObject(task);
        }.bind(this));
    }.observes('tasks'),

    _newTaskDescription: function () {
        var task = this.get('newTask');
        if (task.get('description')) {
            this.get('tasks').then(function (tasks) {
                task = this.store.createRecord('task', { completed: false });
                this.set('newTask', task);
                tasks.addObject(task);
            }.bind(this));
        }
    }.observes('newTask.description'),

    actions: {
        save: function () {
            var day = this.get('model');
            Em.RSVP.all(this
                .get('tasks').slice(0, -1)
                .map(function (task) { return task.save(); })
            ).then(function () {
                day.save();
            });
        },

        undo: function () {
            var tasks = this.get('tasks');
            tasks.slice(0, -1).forEach(function (task) { task.rollback(); });
            var model = this.get('model');
            if (model.get('id'))
                this.get('model').reload();
            else
                this.set('model', this.store.createRecord('day', { date: model.get('date') }));
        }
    }
});