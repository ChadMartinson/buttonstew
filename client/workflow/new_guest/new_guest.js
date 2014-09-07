Template.new_guest.getEmail = function() {
  var id = window.location.toString().split(window.location.host)[1].slice(1);
  var guest = GuestModel.findOne({"_id": id}, {email: 1}).email;
    return guest;
};

Template.new_guest.events({
  'submit #register-form' : function(e, t) {
    e.preventDefault();
    var username = t.find('#firstName').value + " "+ t.find('#lastName').value;
    var email = t.find('#account-email').value;
        password = t.find('#account-password').value;

      // Trim and validate the input

    Accounts.createUser({username: username, email: email, password: password}, function(err){
        if (err) {
          // Inform the user that account creation failed
        } else {
          // Success. Account has been created and the user
          // has logged in successfully. 
        }

      });

    return false;
  }
});