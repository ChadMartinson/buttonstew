//////////
// Meal //
//////////
MealModel = new Meteor.Collection("Meals");

  createMeal = function (options) {
    var id = Random.id();
    Meteor.call('createMeal', _.extend({ _id: id }, options));
    return id;
  },
/*  invite = function(options) {
    Meteor.call('invite', options, function(err, res) {
      console.log("got the response");

      console.log(res);
    });
  },*/
  deleteMeal = function(meal) {
    MealModel.remove({_id: meal});
  },
  change_current = function(meal) {
    Session.set('current_meal', meal);
  },
  edit_current = function(meal) {
    Session.set('this_meal', meal);
  },
//////////
// Menu //
//////////
MenuModel = new Meteor.Collection("Menu");

  createMenu = function (options) {
    var id = Random.id();
    Meteor.call('createMenu', _.extend({ _id: id }, options));
    return id;
  },
  editMenu = function(dish, new_category, new_dish) {
    MenuModel.update({_id: dish}, {
      $set: {
        category: new_category,
        dish: new_dish
      }
    });
  },
  deleteMenu = function(dish) {
    MenuModel.remove({_id: dish});
  },


////////////
// Guests //
////////////
GuestModel = new Meteor.Collection("Guests");

  createGuest = function (options) {
    var id = Random.id();
    Meteor.call('createGuest', _.extend({ _id: id }, options));
    return id;
  },
  editGuest = function(guest, new_name, new_email) {
    GuestModel.update({_id: guest}, {
      $set: {
        name: new_name,
        email: new_email
      }
    });
  },
  deleteGuest = function(guest) {
    GuestModel.remove({_id: guest});
  },

/////////////////
// Ingredients //
/////////////////
IngredientModel = new Meteor.Collection("Ingredients");

  addIngredient = function(options) {
    var id = Random.id();
    Meteor.call('addIngredient', _.extend({ _id: id }, options));
    return id;
  },
  editIngredient = function(ingredient, new_quantity, new_item) {
    IngredientModel.update({_id: ingredient}, {
      $set: {
        quantity: new_quantity,
        item: new_item
      }
    });
  },
  gotPicked = function(ingredientId, guestBringing) {
    IngredientModel.update({_id: ingredientId}, {$set: {guestBringing: guestBringing}});
  },
  deleteIngredient = function(ingredient) {
    IngredientModel.remove({_id: ingredient});
  },

  IngredientModel.allow({
    insert: function (userId, meal) {
      return false; // no cowboy inserts -- use createParty method
    },
    update: function (userId, meal, fields, modifier) {
      if (userId !== meal.owner || userId === meal.owner)
        return true; // not the owner
    },
    remove: function (userId, meal) {
      // You can only remove parties that you created and nobody is going to.
      return meal.owner === userId;
    }
  });

  MealModel.allow({
    insert: function (userId, meal) {
      return false; // no cowboy inserts -- use createParty method
    },
    update: function (userId, meal, fields, modifier) {
      if (userId !== meal.owner || userId === meal.owner)
        return true; // not the owner
    },
    remove: function (userId, meal) {
      // You can only remove parties that you created and nobody is going to.
      return meal.owner === userId;
    }
  });