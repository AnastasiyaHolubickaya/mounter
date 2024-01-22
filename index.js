import express, { json } from 'express';
import cors from 'cors';

const port = 3000;
const app = express();

app.use(json());
app.use(cors());

app.post('/api/registration', (request, response) => {
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

    response.status(201).json({ message: 'Sucsess!' });
  } catch (error) {
    response.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(` Server started in port: ${port} `);
});
