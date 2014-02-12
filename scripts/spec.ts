/// <reference path="../typings/ember/ember.d.ts" />

declare module DS {
    interface Store {
        findFirst?(type: string, query: {}): any;
    }
}

declare module Ember {
    interface Application {
        Task?: typeof DS.Model;
        TaskAdapter?: DS.Adapter;
        TaskController?: Ember.Controller;
        Day?: typeof DS.Model;
        DayAdapter?: DS.Adapter;
        DayRoute?: Ember.Route;
    }
}