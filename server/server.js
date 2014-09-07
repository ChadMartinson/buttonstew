
Meteor.publish('meals', function() {
  if (!this.userId)
    return this.ready();

  var guest = GuestModel.find({});
  var user = Meteor.users.findOne(this.userId);
  var userEmail = user.emails[0].address;
  return MealModel.find(
    {$or: [{"_id": guest.meal}, {'owner': this.userId}]});
});

Meteor.publish("guest", function() {
  return GuestModel.find({});
});

Meteor.publish('menu', function() {
  return MenuModel.find({});
});

Meteor.publish("ingredients", function() {
  return IngredientModel.find({});
});
