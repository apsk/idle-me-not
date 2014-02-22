IdleMeNot.Router.map(function () {
    this.route('day', { path: '/:date' });
});

IdleMeNot.IndexRoute = Ember.Route.extend({
    beforeModel: function() {
        this.transitionTo('day');
    }
});

IdleMeNot.DayRoute = Ember.Route.extend({
    model: function (params) {
        var store = this.store;
        var dateString = params.date;
        if (!DateUtils.isValidDateString(params.date))
            dateString = DateUtils.todaysDateString();
        return store.findFirst('day', { date: dateString })
            .then(function (record) {
                // return record || store.createRecord('day', { date: dateString });
                if (record) {
                    return store.find('task', { day: record.get('id') })
                        .then(function (tasks) {
                            // record.get('tasks').addObjects(tasks);
                            // record.get('stateManager').transitionTo('loaded.saved');
                            return record;
                        });
                }
                return store.createRecord('day', { date: dateString });
            });
    },
    afterModel: function (model) {
        return this.store.find('task', { day: model.get('id') });
    },
    actions: {
        prevDate: function (date) {
            this.transitionTo('day', DateUtils.dateStringFromDate(date.shiftDays(-1)));
        },
        nextDate: function (date) {
            this.transitionTo('day', DateUtils.dateStringFromDate(date.shiftDays(+1)));
        },
        gotoDate: function (date) {
            this.transitionTo('day', DateUtils.dateStringFromDate(date));
        }
    }
});