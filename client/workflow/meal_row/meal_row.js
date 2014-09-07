///////////////////////
// meal row template //
///////////////////////
Template.meal_row.owner = function() {
  return this.owner === Meteor.userId();
};

Template.meal_row.events({
  'click .mealDetails': function() {
    change_current(this);
  },
  'click .deleteMeal': function () {
    deleteMeal(this._id);
  },
  'click .openMeal': function() {
    edit_current(this);
  }
});

