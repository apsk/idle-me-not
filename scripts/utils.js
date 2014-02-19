String.prototype.format = function (args) {
    return this.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
        if (m == "{{") {
            return "{";
        }
        if (m == "}}") {
            return "}";
        }
        return args[n];
    });
};

Date.prototype.shiftDays = function (days) {
    var newDate = new Date(this.getTime());
    newDate.setDate(newDate.getDate() + days);
    return newDate;
};

var Nothing = {
    maybe: function (_, fail) {
        return fail();
    },
    map: function () {
        return Nothing;
    },
    bind: function () {
        return Nothing;
    },
    get: function () {
        throw 'Tried to retrieve value from Nothing!';
    },
    getOrElse: function (x) {
        return x;
    },
    isJust: function () {
        return false;
    }
};

function Just(x) {
    return {
        maybe: function (success) {
            return success(x);
        },
        map: function (fn) {
            return Just(fn(x));
        },
        bind: function (fn) {
            return fn(x);
        },
        get: function () {
            return x;
        },
        getOrElse: function () {
            return x;
        },
        isJust: function () {
            return true;
        }
    };
}

var DateUtils = {
    MONTH_NAMES: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    tryParseDateParts: function (dateString) {
        var parts = dateString.split('-');
        var fail = false;
        var intParts = parts.map(function (s) {
            var n = parseInt(s);
            if (isNaN(n))
                fail = true;
            return n;
        });
        fail = fail || parts.length < 3 || intParts[1] < 1 || intParts[1] > 12 || intParts[2] < 1 || intParts[2] > 31;
        return fail ? Nothing : Just(intParts);
    },
    expandDate: function (date) {
        return '{0} {1}, {2}'.format([
            date.getDate(), DateUtils.MONTH_NAMES[date.getMonth()], date.getFullYear()
        ]);
    },
    dateStringFromDate: function (date) {
        return '{0}-{1}-{2}'.format([
            date.getFullYear(), date.getMonth(), date.getDate()
        ]);
    },
    dateFromDateString: function (dateString) {
        var parts = this.tryParseDateParts(dateString).get();
        var date = new Date();
        date.setFullYear(parts[0]);
        date.setMonth(parts[1]);
        date.setDate(parts[2]);
        return date;
    },
    todaysDateString: function () {
        return this.dateStringFromDate(new Date());
    },
    isValidDateString: function (dateString) {
        return dateString ? DateUtils.tryParseDateParts(dateString).isJust() : false;
    }
};