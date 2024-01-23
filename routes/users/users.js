//*Base
import { Router } from 'express';
import { User, addUser, comparePass } from '../../models/user.js';
import config from '../../config/bd.js';

const router = Router();

router.post('/registration', async (request, response) => {
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
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user) {
      return response.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({
      email: email.toLowerCase(),
      createdDate: Date.now(),
      updatedDate: Date.now(),
      password,
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      phone,
    });

    addUser(newUser, (user) => {
      //response.status(201).json(user);
      user.save();
      response.status(201).json({
        message: 'Sucsess!',
        newUser: {
          firstName: user.firstName[0].toUpperCase() + user.firstName.slice(1),
          lastName: user.lastName[0].toUpperCase() + user.lastName.slice(1),
        },
      });
    });

    //
  } catch (error) {
    response.status(500).json({ message: 'Server error' });
  }
});

router.post('/auth', async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return response.status(400).json({
        message: 'There is no user with this email',
      });
    }

    comparePass(password, user.password, (_f, isMatch) => {
      if (isMatch) {
        import('jsonwebtoken').then((jwt) => {
          const token = jwt.default.sign(user.toJSON(), config.secret, {
            expiresIn: 3600 * 24 * 7,
          });

          response.status(200).json({
            token,
            user: {
              id: user._id,
              email: user.email,
            },
          });
        });
      } else {
        return response.status(400).json({
          message: 'Passwords do not converge!',
        });
      }
    });
  } catch (error) {
    response.status(500).json({
      success: false,
      message: {
        ua: 'Виникли деякі проблеми',
        ru: 'Возникли некоторые проблемы',
        en: 'There were some problems',
      },
      error: error,
    });
  }
});

export default router;
