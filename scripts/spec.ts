/// <reference path="../typings/ember/ember.d.ts" />

declare module DS {
    interface Store {
        findFirst?(type: string, query: {}): any;
    }
}

declare module Ember {
    interface Application {
        IndexRoute?: Ember.Route;
        Task?: typeof DS.Model;
        TaskAdapter?: DS.Adapter;
        TaskController?: Ember.Controller;
        Day?: typeof DS.Model;
        DayAdapter?: DS.Adapter;
        DayController?: Ember.Controller;
        DayRoute?: Ember.Route;
    }
}