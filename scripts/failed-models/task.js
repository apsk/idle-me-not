IdleMeNot.Task = IdleMeNot.Object.extend({
    startingTime: '',
    endingTime: '',
    description: '',
    completed: false,
    day: null,
    serialize: function () {
        var data = IdleMeNot.Object.fieldSerializer([
            'id', 'startingTime', 'endingTime',
            'description', 'completed'
        ])(this);
        data.day = this.get('day').get('id');
        return data;
    }
});

IdleMeNot.Task.reopenClass({
    type: 'task',
    extract: IdleMeNot.Task.create
});