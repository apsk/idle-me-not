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
    tryComputeDateNumberForParts: function (dateParts) {
        return dateParts.length < 3 ? Nothing : Just((dateParts[0] - 2000) * 372 + (dateParts[1] - 1) * 31 + dateParts[2] - 1);
    },
    tryComputeDateNumberForString: function (dateString) {
        return DateUtils.tryParseDateParts(dateString).bind(function (dp) {
            return DateUtils.tryComputeDateNumberForParts(dp);
        });
    },
    tryExpandDateString: function (dateString) {
        return DateUtils.tryParseDateParts(dateString).map(function (dp) {
            return '{0} {1}, {2}'.format([dp[2], DateUtils.MONTH_NAMES[dp[1]], dp[0]]);
        });
    },
    computeTodaysDateNumber: function () {
        var date = new Date();
        return DateUtils.tryComputeDateNumberForParts([
            date.getFullYear(), date.getMonth(), date.getDate()
        ]).get();
    },
    todaysDateString: function () {
        var date = new Date();
        return '{0}-{1}-{2}'.format([
            date.getFullYear(), date.getMonth(), date.getDate()
        ]);
    },
    isValidDateString: function (dateString) {
        return dateString ? DateUtils.tryParseDateParts(dateString).isJust() : false;
    }
};