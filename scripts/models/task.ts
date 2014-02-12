/// <reference path="../application.ts" />

IdleMeNot.Task = DS.Model.extend({
    startingTime: DS.attr('string'),
    endingTime: DS.attr('string'),
    description: DS.attr('string'),
    completed: DS.attr('boolean'),
    day: DS.belongsTo('day')
});

IdleMeNot.TaskAdapter = SpecializedLocalstorageAdapter('task');

/*
IdleMeNot.Task.FIXTURES = [{
    id: 0,
    startingTime: '06:00',
    endingTime: '07:00',
    description: 'Shower, supper',
    completed: true
}, {
    id: 1,
    startingTime: '07:00',
    endingTime: '08:00',
    description: 'Read internets',
    completed: true
}, {
    id: 2,
    startingTime: '08:00',
    endingTime: '12:00',
    description: 'Write typings',
    completed: true
}];
*/