/// <reference path="../typings/ember/ember.d.ts" />

declare module DS {
    interface Store {
        findFirst?(type: string, query: {}): any;
    }
}

declare module Ember {
    interface Application {
        Task?: DS.Model;
        TaskController?: Ember.Controller;
        Day?: DS.Model;
        DayRoute?: Ember.Route;
    }
}