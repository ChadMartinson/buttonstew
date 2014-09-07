Meteor.methods({
      createMeal: function(options) {
        check(options, {
          dateCreated: String,
          date: String,
          time: String,
          street: String,
          city: String,
          state: String,
          zipcode: String,
          owner: String,
          name: String,
          _id: Match.Optional(String)
      });

      if (options.street.length > 100)
        throw new Meteor.Error(413, 'Street address too long');
      if (options.city.length > 25)
        throw new Meteor.Error(413, 'City name too long');
      if (options.state.length > 20)
        throw new Meteor.Error(413, 'State name too long');
      if (! this.userId)
        throw new Meteor.Error(403, 'You must be logged in');

      var id = options.id || Random.id();
      MealModel.insert({
        _id: id,
        dateCreated: options.dateCreated,
        owner: this.userId,
        street: options.street,
        city: options.city,
        state: options.state,
        zipcode: options.zipcode,
        date: options.date,
        time: options.time,
        name: options.name
      });
      return id;
    },

    createMenu: function(options) {
        check(options, {
          category: String,
          dishName: String,
          meal: String,
          owner: String,
          _id: Match.Optional(String)
        });

        if (options.dishName.length > 50)
          throw new Meteor.Error(413, 'Dish name is too long');
        if (! this.userId)
          throw new Meteor.Error(403, 'You must be logged in');

        var id = options.id || Random.id();
        MenuModel.insert({
          _id: id,
          category: options.category,
          dishName: options.dishName,
          meal: options.meal,
          owner: options.owner
        });
        return id;
      },

      createGuest: function(options) {
          check(options, {
            firstName: String,
            lastName: String,
            email: String,
            meal: String,
            owner: String,
            _id: Match.Optional(String)
          });

          if (options.firstName.length > 15)
            throw new Meteor.Error(413, 'First name is too long');
          if (options.lastName.length > 25)
            throw new Meteor.Meteor.Error(413, 'Last name is too long');
          if (! this.userId)
            throw new Meteor.Error(403, 'You must be logged in');

          var id = options.id || Random.id();
          GuestModel.insert({
            _id: id,
            firstName: options.firstName,
            lastName: options.lastName,
            email: options.email,
            meal: options.meal,
            owner: options.owner
          });

            var contactEmail = function (user) {
              if (user.emails && user.emails.length)
                return user.emails[0].address;
              if (user.services && user.services.facebook && user.services.facebook.email)
                return user.services.facebook.email;
              return null;
            };

            var from = contactEmail(Meteor.users.findOne(this.userId));
            var to = options.email;
            var guest = GuestModel.findOne({email: to});
            var guestLink = guest._id;
            if (Meteor.isServer && to) {
              // This code only runs on the server. If you didn't want clients
              // to be able to see it, you could move it to a separate file.
              Email.send({
                from: "Invitations@buttonstew.com",
                to: to,
                replyTo: from || undefined,
                subject: "You've been invited to cook dinner with us",
                text:
      "Hey, I just invited you to a dinner party on buttonstew." +
      "\n\nCome check it out: " + Meteor.absoluteUrl(guestLink) + "\n"
              });
          }
          return id;
        },

        rsvp: function(guest, rsvp) {
          check(guest, String);
          check(rsvp, String);
          if (! this.userId)
            throw new Meteor.Error(403, "You must be logged in to RSVP");
          if (! _.contains(['yes', 'no', 'maybe'], rsvp))
            throw new Meteor.Error(400, "Invalid RSVP");

          GuestModel.update({_id: guest}, {$set: {"rsvp": rsvp}});
        },

      addIngredient: function(options) {
          check(options, {
            quantity: String,
            ingredient: String,
            meal: String,
            owner: String,
            _id: Match.Optional(String)
          });

          if (options.quantity.length > 15)
            throw new Meteor.Error(413, 'Quantity description is too long');
          if (options.ingredient.length > 25)
            throw new Meteor.Meteor.Error(413, 'Item name is too long');
          if (! this.userId)
            throw new Meteor.Error(403, 'You must be logged in');

          var id = options.id || Random.id();
          IngredientModel.insert({
            _id: id,
            quantity: options.quantity,
            ingredient: options.ingredient,
            meal: options.meal,
            owner: this.userId,
          });
          return id;
        }
});