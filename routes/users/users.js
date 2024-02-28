import { Router } from 'express';
import { User, addUser, comparePass } from '../../models/user.js';
import config from '../../config/bd.js';

//* Create an instance of the Express Router
const router = Router();

//* Define an endpoint for user registration (/registration)
router.post('/registration', async (request, response) => {
  try {
    //? Extract user data from the request body
    const { firstName, lastName, password, email, phone } = request.body;

    //? Initialize an empty object for error messages
    const errors = {};
    let isError = false;

    //? Validate required fields and populate the errors object
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

    //? If there are errors, return a 400 status with error messages
    if (isError) {
      return response.status(400).json(errors);
    }

    //? Check if a user with the same email already exists
    const user = await User.findOne({ email: email.toLowerCase() });

    //? If a user with the same email exists, return an error message
    if (user) {
      return response.status(400).json({ message: 'User already exists' });
    }

    //? If the user is unique, create a new User instance
    const newUser = new User({
      email: email.toLowerCase(),
      createdDate: Date.now(),
      updatedDate: Date.now(),
      password,
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      phone,
    });

    //? Add the user to the database and send a success response
    addUser(newUser, (user) => {
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
    //? Handle server errors by sending a 500 status with a generic message
    response.status(500).json({ message: 'Server error' });
  }
});

//* Define an endpoint for user authentication (/auth)
router.post('/auth', async (request, response) => {
  try {
    //? Extract email and password from the request body
    const { email, password } = request.body;

    //? Find the user with the provided email in the database
    const user = await User.findOne({ email: email.toLowerCase() });

    //? If no user is found, return an error message
    if (!user) {
      return response.status(400).json({
        messageMail: 'There is no user with this email',
      });
    }

    //* Use the comparePass function to compare the provided password with the stored password
    comparePass(password, user.password, (_f, isMatch) => {
      //* If passwords match, generate a JWT token and send it in the response
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
        //* If passwords do not match, return an error message
        return response.status(400).json({
          messagePass: 'Passwords do not converge',
        });
      }
    });
  } catch (error) {
    //* Handle server errors by sending a 500 status with an error message
    response.status(500).json({
      success: false,
      message: 'Server Error',
      error: error,
    });
  }
});

export default router;
