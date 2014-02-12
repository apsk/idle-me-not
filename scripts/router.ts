/// <reference path="application.ts" />

IdleMeNot.Router.map(function () {
    this.route('day', { path: '/:date' });
});

IdleMeNot.DayRoute = Ember.Route.extend({
    model: function (params?) {
        var store: DS.Store = this.store;
        var todaysDateString = DateUtils.todaysDateString();
        return store.findFirst('day', { date: todaysDateString })
            .then(function (record) {
                if (record) return record;
                return store.createRecord('day', { date: todaysDateString })
                    .save().then(day => {
                        return store.createRecord('task', {
                            startingTime: '6:00',
                            endingTime: '7:00',
                            description: 'Clean teeth',
                            day: day
                        }).save().then(task => {
                            day.get('tasks').addObject(task);
                            return day;
                        })
                    });
            });
    }
});