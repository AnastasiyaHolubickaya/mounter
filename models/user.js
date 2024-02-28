import { Schema, model } from 'mongoose';

//* Define the User schema with required fields
const UserSchema = Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },

  //* Date fields for created and updated timestamps
  createdDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

//* Create the User model using the schema and export it
const User = model('users', UserSchema); // експортируем результат работы функции model

//* Function to add a new user, hash the password before saving
const addUser = (newUser, callback) => {
  import('bcrypt').then((bcrypt) => {
    //* Generate a salt and hash the user's password
    bcrypt.genSalt(10, (_, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        //* Call the callback with the modified newUser object
        callback(newUser);
      });
    });
  });
};

//* Function to compare a password with the hashed password from the database
const comparePass = (passFromUser, userDBPass, callback) => {
  import('bcrypt').then((bcrypt) => {
    //* Compare the passwords and invoke the callback with the result
    bcrypt.compare(passFromUser, userDBPass, (err, isMatch) => {
      if (err) throw err;
      callback(null, isMatch);
    });
  });
};

export { User, addUser, comparePass };
