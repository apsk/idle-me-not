IdleMeNot.Router.map(function () {
    this.route('day', { path: '/:date' });
});

IdleMeNot.IndexRoute = Em.Route.extend({
    beforeModel: function() {
        this.transitionTo('day', DateUtils.todaysDateString());
    }
});

IdleMeNot.DayRoute = Em.Route.extend({
    model: function (params) {
        var store = this.store;
        var dateString = params.date;
        if (!DateUtils.isValidDateString(dateString))
            dateString = DateUtils.todaysDateString();
        return store.findFirst('day', { date: dateString }).then(function (record) {
            return record || store.createRecord('day', { date: dateString });
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