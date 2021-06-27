"use strict";

// Lista de tareas
var mylist = [];
// Lista de tareas con formato para el calendario
var myListToCalendar = mylist;

var firebaseConfig = {
  apiKey: "AIzaSyCdwij69YLkZXzBlRRlfssORhTBH9CjP_A",
  authDomain: "jdbmtodolistapp.firebaseapp.com",
  projectId: "jdbmtodolistapp",
  databaseURL: "https://jdbmtodolistapp-default-rtdb.firebaseio.com/",
  storageBucket: "jdbmtodolistapp.appspot.com",
  messagingSenderId: "950445551272",
  appId: "1:950445551272:web:912197c95fd51eeb1fdc9d",
  measurementId: "G-RL0CSF60PJ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const FBURL = "https://INSTANCE.firebaseio.com";
const loginRedirectPath = "/login";

var app = angular
  .module("myApp", [
    "firebase",
    "ngRoute",
    "myApp.inicio",
    "myApp.calendario",
    "myApp.version",
    "myApp.services",
  ])
  // .run(['$rootScope', 'FBURL', function($rootScope, FBURL){
  //     $rootScope.FBURL = FBURL;
  // }])
  .run([function(){
    registerServiceWorker();
  }])
  .config([
    "$locationProvider",
    "$routeProvider",
    function ($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix("!");
      $routeProvider.otherwise({ redirectTo: "/" });
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
