import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');
export const Capacity = new Mongo.Collection('capacity');

if(Meteor.isServer) {
  Meteor.publish('tasks', function tasksPublication(){
    var n = Tasks.find({});
    console.log(n);

    return n;
  });

  Meteor.publish('capacity', function capacityPublication(){
    return Capacity.find({}, {});
  });
}

Meteor.methods({
  'tasks.insert'(description, dueDate, dueTime, title, estimatedEffort){
    //estimatedEffort in hours, e.g. 0.25 hours
     check(description, String);
     check(title, String);
     //check(dueDate, Date);
     //check(dueTime, Date);
     check(estimatedEffort, Number);

     if(!Meteor.userId()){
       throw new Meteor.Error('not-authorized');
     }

     Tasks.insert({
       description,
       createdAt: new Date(),
       owner: Meteor.userId(),
       username: Meteor.user().username,
       title,
       dueDate,
       dueTime,
       estimatedEffort,
       finished: false
     });
  },
  'capacity.insert'(date, duration, timreslot){
    //check date
    //duration in minutes
    check(date, Date);
    check(duration, Number);


    if(!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }

    Capacity.insert({
      duration,
      date,
      timeslot,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  }
});
