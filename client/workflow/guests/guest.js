/*/////////////////
// Guest Panel //
////////////
Template.guest_panel.guests = function() {
  var meal = Session.get('current_meal')._id;
  return GuestModel.find({meal: meal});
};

Template.guest_panel.events({
  'click .addGuest': function (evt, tmpl) {
    var firstName = tmpl.find('.firstName').value;
    var lastName = tmpl.find('.lastName').value;
    var email = tmpl.find('.email').value;
    var meal = Session.get('current_meal');


    if (firstName.length && lastName.length && email.length) {
      var id = createGuest({
        firstName: firstName,
        lastName: lastName,
        email: email,
        meal: meal._id,
        owner: meal.owner
      });
     var invited = invite({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mealId: meal._id
      });
    };
    return false;
  },
  'click #deleteGuest': function() {
    deleteGuest(this._id);
    return false;
  }
});
*/