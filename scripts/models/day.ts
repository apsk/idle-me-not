/// <reference path="../application.ts" />

IdleMeNot.Day = DS.Model.extend({
    date: DS.attr('number'),
    tasks: DS.hasMany('task', { async: true })
});

IdleMeNot.Day.FIXTURES = [{
    id: 0,
    date: DateUtils.computeTodaysDateNumber(),
    tasks: [0, 1, 2]
}];