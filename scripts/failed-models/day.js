IdleMeNot.Day = IdleMeNot.Object.extend({
    date: '',
    tasks: [],
    serialize: IdleMeNot.Object.fieldSerializer(['id', 'date'])
});

IdleMeNot.Day.reopenClass({
    type: 'day',
    extract: function (json) {
        var day = IdleMeNot.Day.create({
            id: json.id,
            date: json.date,
            tasks: IdleMeNot.Task.findAll({ day: json.id })
        });
        day.tasks.forEach(function (task) {
            task.set('day', day);
        });
        return day;
    }
});