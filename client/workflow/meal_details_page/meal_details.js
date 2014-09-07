Template.meal_details_page.events({
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
   };
    return false;
  },
  'click .addIngredientBtn': function () {
    return Session.set('addIngredient', true);
  },
  'click .newIngredient': function (evt, tmpl) {
    var quantity = tmpl.find('.quantity').value;
    var ingredient = tmpl.find('.ingredient').value;
    var this_meal = Session.get('current_meal');
    var meal = this_meal._id;
    var owner = this_meal.owner;

    if (quantity.length && ingredient.length) {
      var id = addIngredient({
        quantity: quantity,
        ingredient: ingredient,
        owner: owner,
        meal: meal
      });
    };
    return Session.set('addIngredient', false);
    return false;
  },
  'click .pick': function(e,t){
      //add user as Bringer
      var ingredientId = this._id;
      var guestBringing = Meteor.user().username;
      gotPicked(ingredientId, guestBringing);
      return false;
    },
    'click .unpick': function(e,t){
      //remove user as Bringer
      var ingredientId = this._id;
      var guestBringing = "";
      gotPicked(ingredientId, guestBringing);
      return false;
    },
  'click .go_back': function () {
    return Session.set('current_meal', null);
  }
});

Template.meal_details_page.helpers({
  meal: function () {
    return MealModel.findOne(Session.get('current_meal'));
  },
  addIngredient: function() {
    return Session.get('addIngredient');
  },
  owner: function() {
    var meal = MealModel.findOne(Session.get('current_meal'));
    return meal.owner === Meteor.userId();
  },
  guests: function() {
    var guests = Session.get('current_meal')._id;
    return GuestModel.find({meal: guests});
  },
  ingredients: function() {
    var ingredients = Session.get('current_meal')._id;
    return  IngredientModel.find({meal: ingredients});
  },
  invited: function() {
    var meal = Session.get('current_meal')._id;
    var guestEmail = Meteor.user().emails[0].address;
    return GuestModel.findOne({$and: [{meal: meal}, {email: guestEmail}]});
  },
  userIsGuestBringing: function() {
    var ingredientId = this._id;
    var itemBrung = IngredientModel.findOne({_id: ingredientId});
    return itemBrung.guestBringing === Meteor.user().username;
  }
});

Template.menu_details.helpers({
  addAppetizer: function() {
    return Session.get('addAppetizer');
  },
  addEntree: function() {
    return Session.get('addEntree');
  },
  addSide: function() {
    return Session.get('addSide');
  },
  addDessert: function() {
    return Session.get('addDessert');
  },
  addBeverage: function() {
    return Session.get('addBeverage');
  },
  owner: function() {
    var meal = MealModel.findOne(Session.get('current_meal'));
    return meal.owner === Meteor.userId();
  },
  appetizer: function() {
    var mealId = Session.get('current_meal')._id;
    return MenuModel.find({$and: [{meal: mealId}, {category: "Appetizer"}]});
  },
  entree: function() {
    var mealId = Session.get('current_meal')._id;
    return MenuModel.find({$and: [{meal: mealId}, {category: "Entree"}]});
  },
  side: function() {
    var menu = Session.get('current_meal')._id;
    return MenuModel.find({$and: [{meal: menu}, {category: "Side"}]});
  },
  dessert: function() {
    var menu = Session.get('current_meal')._id;
    return MenuModel.find({$and: [{meal: menu}, {category: "Dessert"}]});
  },
  beverage: function() {
    var menu = Session.get('current_meal')._id;
    return MenuModel.find({$and: [{meal: menu}, {category: "Beverage"}]});
  }
});

Template.menu_details.events({
  'click .addAppetizerBtn': function () {
    return Session.set('addAppetizer', true);
  },
  'click .newAppetizer': function(evt, tmpl) {
      var category = "Appetizer";
      var dishName = tmpl.find('.dish').value;
      var this_meal = Session.get('current_meal');
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
      return Session.set('addAppetizer', false);
      return false;
    },
    'click .addEntreeBtn': function () {
      return Session.set('addEntree', true);
    },
    'click .newEntree': function(evt, tmpl) {
        var category = "Entree";
        var dishName = tmpl.find('.dish').value;
        var this_meal = Session.get('current_meal');
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
        return Session.set('addEntree', false);
        return false;
      },
    'click .addSideBtn': function () {
      return Session.set('addSide', true);
    },
    'click .newSide': function(evt, tmpl) {
        var category = "Side";
        var dishName = tmpl.find('.dish').value;
        var this_meal = Session.get('current_meal');
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
        return Session.set('addSide', false);
        return false;
      },
    'click .addDessertBtn': function () {
      return Session.set('addDessert', true);
    },
    'click .newDessert': function(evt, tmpl) {
        var category = "Dessert";
        var dishName = tmpl.find('.dish').value;
        var this_meal = Session.get('current_meal');
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
        return Session.set('addDessert', false);
        return false;
      },
    'click .addBeverageBtn': function () {
      return Session.set('addBeverage', true);
    },
    'click .newBeverage': function(evt, tmpl) {
        var category = "Beverage";
        var dishName = tmpl.find('.dish').value;
        var this_meal = Session.get('current_meal');
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
        return Session.set('addBeverage', false);
        return false;
      }
});