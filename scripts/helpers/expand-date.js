Ember.Handlebars.helper('expand-date', function(dateString) {
    return DateUtils.tryExpandDateString(dateString).getOrElse('Wrong date!');
});