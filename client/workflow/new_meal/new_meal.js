///////////////////
// new_meal_form //
///////////////////
Template.new_meal_form.rendered = function () {
  $(function() {
    $( "#datepicker" ).datepicker();
    $( "#timepicker").timepicker();
  });
};

Template.new_meal_form.events({
  'click .cancel': function () {
    // ...
    return Session.set('new_meal', false);
  },
  'click .save': function (e, t) {
      var date = t.find(".date").value;
      var time = t.find(".time").value;
      var street = t.find(".street").value;
      var city = t.find(".city").value;
      var state = t.find(".state").value;
      var zipcode = t.find(".zipcode").value;
      var name = Meteor.user().username;
      var owner = Meteor.userId();
      var dateCreated = Date();

      if (date.length && time.length && 
        street.length && city.length && state.length) {
        var id = createMeal({
          dateCreated: dateCreated,
          date: date,
          time: time,
          street: street,
          city: city,
          state: state,
          zipcode: zipcode,
          name: name,
          owner: owner
        });
      };
      return Session.set('new_meal', false)
    }
});