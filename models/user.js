import mongoose from 'mongoose'; //достаем  из mongoose поле Schema и функцию model

// создаем schema через конструктор классов
const UserSchema = mongoose.Schema({
  // поле -  тип строка, обязательное, уникальное
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
});

const User = mongoose.model('users', UserSchema); // експортируем результат работы функции model

const addUser = (newUser, callback) => {
  bcrypt.callback();
};

export default User;
