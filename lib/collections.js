import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');
export const Capacity = new Mongo.Collection('capacity');

if(Meteor.isServer) {
  Meteor.publish('tasks', function tasksPublication(){
    return Tasks.find({}, {});
  });

  Meteor.publish('capacity', function capacityPublication(){
    return Capacity.find({}, {});
  });
}
