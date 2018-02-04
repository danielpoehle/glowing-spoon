import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';
import { Tasks } from '../lib/collections.js';
import { Accounts } from 'meteor/accounts-base';

import './main.html';

activeTab = new ReactiveVar('nt1'); //Your default tab
todayTimetamp = new ReactiveVar(new Date());
estimateValue = new ReactiveVar(0.5);

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('tasks');
});

Template.body.helpers({
  tasks(){
    n = Tasks.find({});
    return n;
  }
});

Template.body.events({
  "click #nt1": function(){
     activeTab.set('nt1');
  },
  "click #nt2": function(){
     activeTab.set('nt2');
  },
  "click #nt3": function(){
     activeTab.set('nt3');
  }
});

Template.display.helpers({
    activeTab: function(tab){
        return (activeTab.get() == tab);
      },
});


Template.taskview.helpers({
  selectedDate() {
    return todayTimetamp.get().toLocaleDateString();
  },
});

Template.taskview.events({
  'click #rem1day'() {
    // increment the counter when button is clicked
    var d = new Date(todayTimetamp.get());
    d.setDate(d.getDate() - 1)
    todayTimetamp.set(d);
  },
  'click #add1day'() {
    // increment the counter when button is clicked
    var d = new Date(todayTimetamp.get());
    d.setDate(d.getDate() + 1)
    todayTimetamp.set(d);
  },
});


Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('tasks');
});



Template.taskmanager.helpers({
  today() {
    var d = new Date();
    var s = d.getFullYear().toString().concat("-",('0'+(d.getMonth()+1)).slice(-2),
            "-", ('0'+d.getDate()).slice(-2));
    return s;
  },
  estimateValue(){
    return estimateValue.get();
  },
  tasks() {
    Tasks.find({});
  }
});

Template.taskmanager.events({
  "mouseover #estimate": function (event, template) {

    const target = event.target;
    const textValue = target.value;

    estimateValue.set(textValue);
  },
  "click #estimate": function (event, template) {

    const target = event.target;
    const textValue = target.value;

    estimateValue.set(textValue);
  },
  'submit .add-task': function(event, template) {
    event.preventDefault();
    const target = event.target;

    const description = target.description.value;
    const dueDate = target.dueDate.value;
    const dueTime = target.dueTime.value;
    const title = target.title.value;
    const estimatedEffort = Number(target.estimate.value);
    //console.log(description + " " + dueDate + " " + dueTime + " " + title + " "+ estimatedEffort);


    //Insert Note into collection
    Meteor.call('tasks.insert', description, dueDate, dueTime, title, estimatedEffort);

    //Clear the form
    target.description.value = "";
    var d = new Date();
    target.dueDate.value = d.getFullYear().toString().concat("-",('0'+(d.getMonth()+1)).slice(-2),
            "-", ('0'+d.getDate()).slice(-2));
    target.dueTime.value = "17:00";
    target.title.value = "";
    estimateValue.set(0.5);
  }
});
