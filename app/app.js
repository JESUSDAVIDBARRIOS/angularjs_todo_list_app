"use strict";

// Lista de tareas
var mylist = [];
// Lista de tareas con formato para el calendario
var myListToCalendar = mylist;

var app = angular
  .module("myApp", [
    "ngRoute",
    "myApp.inicio",
    "myApp.calendario",
    "myApp.version"
  ])
  .run([function(){
    registerServiceWorker();
  }])
  .config([
    "$locationProvider",
    "$routeProvider",
    '$compileProvider',
    function ($locationProvider, $routeProvider, $compileProvider) {
      $locationProvider.hashPrefix("!");
      $routeProvider.otherwise({ redirectTo: "/" });
      $compileProvider.debugInfoEnabled(false);
    },
  ]);

async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register("./service-worker.js");
    } catch (e) {
      console.log(`ServiceWorker registration failed`);
    }
  }
}
