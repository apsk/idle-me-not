IdleMeNot.Task = DS.Model.extend({
    startingTime: DS.attr('string'),
    endingTime: DS.attr('string'),
    description: DS.attr('string'),
    completed: DS.attr('boolean'),
    day: DS.belongsTo('day')
});