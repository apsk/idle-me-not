/// <reference path="application.ts" />

IdleMeNot.Router.map(function () {
    this.route('day', { path: '/:date' });
    this.route('asd');
});

IdleMeNot.DayRoute = Ember.Route.extend({
    model: function (params?) {
        return this.store.findFirst('day', { date:
            DateUtils.tryComputeDateNumberForString(params.date).maybe(
                dateNumber => dateNumber,
                () => DateUtils.computeTodaysDateNumber()
            )
        });
    }
});

//IdleMeNot.TaskRoute = Ember.Route.extend({
//    setupController: function(controller, task) {
//        controller.set('model', task);
//    }
//});