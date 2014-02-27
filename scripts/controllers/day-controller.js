IdleMeNot.DayController = Em.ObjectController.extend({
    newTask: null,

    date: function () {
        return DateUtils.dateFromDateString(this.get('model.date'));
    }.property('model.date'),

    completionPercentage: function () {
        var tasks = this.get('tasks').slice(0, -1);
        var total = tasks.get('length');
        var completed = tasks.filterBy('completed', true).get('length');
        return total == 0 ? 0 : Math.round(completed * 100 / total);
    }.property('tasks.@each.completed'),

    lastTaskEndingTime: function () {
        var tasks = this.get('tasks');
        for (var i = tasks.get('length') - 1; i >= 0; i--) {
            var endingTime = tasks.objectAt(i).get('endingTime');
            if (endingTime) return endingTime;
        }
        return '07:00';
    }.property('tasks.@each.endingTime'),

    _tasksInitialized: function () {
        this.get('tasks').then(function (tasks) {
            var task = this.store.createRecord('task', {
                startingTime: '06:00',
                endingTime: '07:00',
                completed: false
            });
            this.set('newTask', task);
            tasks.addObject(task);
        }.bind(this));
    }.observes('tasks'),

    _newTaskDescription: function () {
        var task = this.get('newTask');
        if (task.get('description')) {
            this.get('tasks').then(function (tasks) {
                task = this.store.createRecord('task', {
                    startingTime: this.get('lastTaskEndingTime'),
                    completed: false
                });
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