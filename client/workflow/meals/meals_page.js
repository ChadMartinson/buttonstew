/////////////////////////
// meals_page template //
/////////////////////////
Template.meals_page.mealDetails = function() {
  return Session.get('current_meal');
};

Template.meals_page.hasMeals = function() {
  return MealModel.find({}).count();
};

Template.meals_page.isWelcome = function() {
  return MealModel.find({});
};

Template.meals_page.meals = function() {
  return MealModel.find({});
};

Template.meals_page.openMeal = function() {
  return Session.get('this_meal');
};

Template.meals_page.new_meal = function() {
  return Session.get('new_meal');
};

Template.meals_page.events({
  'click .new_meal': function () {
    return Session.set('new_meal', true);
  }
});