/////////////////////////
// welcome template //
/////////////////////////
Template.welcome.logged_in = function() {
  return Meteor.user();
};

Template.welcome.selected = function() {
  return Session.get('current_meal');
};

Template.welcome.helpers({
  logged_in: function () {
    return Meteor.user();
  },
  meal_selected: function() {
    return Session.get('current_meal');
  },
  hash: function() {
    var id = window.location.toString().split(window.location.host)[1].slice(1);
    if (id.length)
      return true;
  }
});