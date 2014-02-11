interface String {
    format(args: any[]): String;
}

String.prototype.format = function (args) {
    return this.replace(/\{\{|\}\}|\{(\w+)\}/g, function (m, n) {
        if (m == "{{") { return "{"; }
        if (m == "}}") { return "}"; }
        return args[n];
    });
};

interface Maybe<X> {
    maybe<Y>(success: (X) => Y, fail: () => Y): Y;
    map<Y>(fn: (X) => Y): Maybe<Y>;
    bind<Y>(fn: (X) => Maybe<Y>): Maybe<Y>;
    get(): X;
}

var Nothing: Maybe<any> = {
    maybe: (_, fail) => fail(),
    map: _ => Nothing,
    bind: _ => Nothing,
    get: () => { throw 'Tried to retrieve value from Nothing!'; }
};

function Just<X>(x: X): Maybe<X> { return {
    maybe: (success, _) => success(x),
    map: fn => Just(fn(x)),
    bind: fn => fn(x),
    get: () => x
}}

interface DateUtils {
    MONTH_NAMES: string[];
    tryParseDateParts(dateString: string): Maybe<number[]>;
    tryComputeDateNumberForParts(dateParts: number[]): Maybe<number>;
    tryComputeDateNumberForString(dateString: string): Maybe<number>;
    tryExpandDateString(dateString: string): Maybe<string>;
    computeTodaysDateNumber(): number;
}

var DateUtils: DateUtils = {
    MONTH_NAMES: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    tryParseDateParts: dateString => {
        var parts = dateString.split('-');
        var parseFail = false;
        var intParts = parts.map(s => {
            var n = parseInt(s);
            if (isNaN(n)) parseFail = true;
            return n;
        });
        return (parts.length < 3 || parseFail)
            ? Nothing : Just(intParts);
    },
    tryComputeDateNumberForParts: dateParts =>
        dateParts.length < 3 ? Nothing : Just(
            (dateParts[0]-2000)*372 + (dateParts[1]-1)*31 + dateParts[2]-1
        ),
    tryComputeDateNumberForString: dateString =>
        DateUtils.tryParseDateParts(dateString).bind(dp =>
            DateUtils.tryComputeDateNumberForParts(dp)
        ),
    tryExpandDateString: dateString =>
        this.tryParseDateParts(dateString).map(dp =>
            '{0} {1}, {2}'.format([dp[2], DateUtils.MONTH_NAMES[dp[1]], dp[0]])
        ),
    computeTodaysDateNumber: () => {
        var date = new Date();
        return DateUtils.tryComputeDateNumberForParts([
            date.getFullYear(), date.getMonth(), date.getDate()
        ]).get();
    }
};