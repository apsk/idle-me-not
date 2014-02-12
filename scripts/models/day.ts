/// <reference path="../application.ts" />

IdleMeNot.Day = DS.Model.extend({
    date: DS.attr('string'),
    tasks: DS.hasMany('task', { async: true })
});

IdleMeNot.DayAdapter = SpecializedLocalstorageAdapter('day');

/*
IdleMeNot.Day.FIXTURES = [{
    id: 0,
    date: 'lol', // DateUtils.computeTodaysDateNumber(),
    tasks: [0, 1, 2]
}];
*/