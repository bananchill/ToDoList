import * as Vue from "vue";

import Application from "./infrastructure/app/application";
import TopLevelAppView from "@/modules/topLevel/topLevelAppView";

import "./styles/total.scss"

// *********************************************************
// Setup version
// *********************************************************

window.Vue = Vue;
// ************************
// Creating application
// ************************

const app = new Application();

const appLogUngroup = app.log.groupCollapsed('configure');



// ************************
// Installing modules
// ************************\

app.use(new TopLevelAppView())



appLogUngroup();
setTimeout(async () => await app.runAsync(), 0);
