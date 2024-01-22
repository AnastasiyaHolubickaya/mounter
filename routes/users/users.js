import { Router } from 'express';
import User from '../../models/user';
const router = Router();

router.post('/registration', (request, response) => {
  try {
    const { firstName, lastName, password, email, phone } = request.body;

    const errors = {};
    let isError = false;

    if (!firstName) {
      isError = true;

      errors.firstName = 'First name is required!';
    }

    if (!lastName) {
      isError = true;

      errors.lastName = 'Last name is required!';
    }

    if (!password) {
      isError = true;

      errors.password = 'Password is required!';
    }

    if (!email) {
      isError = true;

      errors.email = 'Email  is required!';
    }

    if (!phone) {
      isError = true;

      errors.phone = 'Phone number is required!';
    }

    if (isError) {
      return response.status(400).json(errors);
    }
    const user = User.findOne({ email: email.toLowerCase() });

    if (user) {
      return response.status(400).json({ message: 'server error' });
    }

    response.status(201).json({ message: 'Sucsess!' });
  } catch (error) {
    response.status(500).json({ message: 'Server error' });
  }
});
