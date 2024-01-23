import { Schema, model } from 'mongoose';

// создаем schema через конструктор классов
const UserSchema = Schema({
  // поле -  тип строка, обязательное
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

const User = model('users', UserSchema); // експортируем результат работы функции model

const addUser = (newUser, callback) => {
  import('bcrypt').then((bcrypt) => {
    bcrypt.genSalt(10, (_, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        //newUser.save(callback);
        callback(newUser);
      });
    });
  });
  //console.log(newUser);
};

const comparePass = (passFromUser, userDBPass, callback) => {
  import('bcrypt').then((bcrypt) => {
    bcrypt.compare(passFromUser, userDBPass, (err, isMatch) => {
      if (err) throw err;
      callback(null, isMatch);
    });
  });
};

export { User, addUser, comparePass };
