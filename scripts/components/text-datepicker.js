IdleMeNot.TextDatepickerComponent = Ember.Component.extend({
    tagName: 'span',
    _wire: function () {
        var component = this;
        var el = this.$();
        var dp = el.find('input');
        dp.css({
            position: 'absolute',
            left: '50%',
            top: '50%',
            padding: 0,
            border: 0,
            fontSize: 0
        });
        dp.datepicker({
            defaultDate: DateUtils.dateFromDateString(this.get('date')),
            onSelect: function () {
                component.sendAction('changed', dp.datepicker('getDate'));
            }
        });
        el.click(function () { dp.focus(); });
    }.on('didInsertElement')
});