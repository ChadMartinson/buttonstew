///////////////
// Edit Meal //
///////////////
Template.edit_meal.rendered = function () {
 
};
Template.edit_meal.helpers({
  appetizer: function() {
    var mealId = Session.get('this_meal')._id;
    return MenuModel.find({$and: [{meal: mealId}, {category: "Appetizer"}]});
  },
  entree: function() {
    var mealId = Session.get('this_meal')._id;
    return MenuModel.find({$and: [{meal: mealId}, {category: "Entree"}]});
  },
  side: function() {
    var menu = Session.get('this_meal')._id;
    return MenuModel.find({$and: [{meal: menu}, {category: "Side"}]});
  },
  dessert: function() {
    var menu = Session.get('this_meal')._id;
    return MenuModel.find({$and: [{meal: menu}, {category: "Dessert"}]});
  },
  beverage: function() {
    var menu = Session.get('this_meal')._id;
    return MenuModel.find({$and: [{meal: menu}, {category: "Beverage"}]});
  },
  guests: function() {
    var meal = Session.get('this_meal')._id;
    return GuestModel.find({meal: meal});
  }
});

Template.edit_meal.events({
  'click #exampleBtn': function() {
       $("#test").modal('show');  
     },
  'click .addDish': function (evt, tmpl) {
    var category = tmpl.find('.category').value;
    var dishName = tmpl.find('.dish').value;
    var this_meal = Session.get('this_meal');
    var meal = this_meal._id;
    var owner = this_meal.owner;

    if (dishName.length) {
      var id = createMenu({
        category: category,
        dishName: dishName,
        meal: meal,
        owner: owner
      });
    };
    return false;
  },
  'click, #deleteDish': function () {
    // ...
    deleteMenu(this._id);
    return false;
  },
  'click .goToMeals': function () {
    return Session.set('this_meal', null);
  },
  'click .addGuest': function (evt, tmpl) {
    var firstName = tmpl.find('.firstName').value;
    var lastName = tmpl.find('.lastName').value;
    var email = tmpl.find('.email').value;
    var this_meal = Session.get('this_meal');
    // var meal = this_meal._id;
    // var owner = this_meal.owner;

    if (firstName.length && lastName.length && email.length) {
      var id = createGuest({
        firstName: firstName,
        lastName: lastName,
        email: email,
        meal: this_meal._id,
        owner: this_meal.owner
      });
     var invited = invite({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mealId: meal
      });
    };
    return false;
  },
  'click #deleteGuest': function() {
    deleteGuest(this._id);
    return false;
  }
});