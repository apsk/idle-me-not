IdleMeNot.Day = DS.Model.extend({
    date: DS.attr('string'),
    tasks: DS.hasMany('task', { async: true })
});