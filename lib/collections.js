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

Meteor.methods({
  'tasks.insert'(description, dueDate, title, estimatedEffort){
    //estimated effort in minutes
     check(estimatedEffort, );

     check(description, String);
     check(title, String);
     check(dueDate, Date);
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
       estimatedEffort
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
