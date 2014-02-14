/// <reference path="application.ts" />

IdleMeNot.Router.map(function () {
    this.route('day', { path: '/:date' });
});

IdleMeNot.IndexRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('day');
    }
});

IdleMeNot.DayRoute = Ember.Route.extend({
    model: function (params?) {
        var store: DS.Store = this.store;
        var dateString = params.date;
        if (!DateUtils.isValidDateString(params.date))
            dateString = DateUtils.todaysDateString();
        return store.findFirst('day', { date: dateString })
            .then(function (record) {
                if (record) return record;
                var day = store.createRecord('day', { date: dateString });
                var task = store.createRecord('task', {
                    startingTime: '6:00',
                    endingTime: '7:00',
                    description: 'Teeth cleaning; calisthenics',
                    day: day
                });
                day.get('tasks').addObject(task);
                return day;
            });
    }
});