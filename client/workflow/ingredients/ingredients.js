///////////////////////
// Ingredients Panel //
///////////////////////

Template.ingredient_panel.ingredients = function() {
  var meal = Session.get('this_meal')._id;
  return IngredientModel.find({meal: meal});
};

Template.ingredient_panel.events({
  'click .addIngredient': function (evt, tmpl) {
    var quantity = tmpl.find('.quantity').value;
    var ingredient = tmpl.find('.ingredient').value;
    var this_meal = Session.get('this_meal');
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
  },
  'click #deleteIngredient': function() {
    deleteIngredient(this._id);
  }
});