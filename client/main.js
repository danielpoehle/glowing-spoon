import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import './main.html';

activeTab = new ReactiveVar('nt1'); //Your default tab
todayTimetamp = new ReactiveVar(new Date());

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('tasks');
  Meteor.subscribe('capacity');
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

Template.taskview.onCreated(function helloOnCreated() {
  // counter starts at 0
  //this.timestamp = new Date();
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
