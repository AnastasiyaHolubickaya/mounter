// * Base
import { Formik, FormikErrors, FormikHelpers } from 'formik';
// * Styles
import styles from './Registration.module.css';
import axios from 'axios';

//* Types
type FormValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

//* Regilar expretions
const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PASS_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const PHONE_REGEXP = /^\+?\d{8,20}$/;

const initialValues: FormValuesType = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
};

//type ValidationType = (values: FormValuesType) => {errors:FormikErrors<FormValuesType>};

const Registration = () => {
  const validation = (values: FormValuesType) => {
    //console.log(values);
    const errors: FormikErrors<FormValuesType> = {};
    //*Email
    if (!values.email) {
      errors.email = 'Email is Required';
    } else if (!EMAIL_REGEXP.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    //*Password
    if (!values.password) {
      errors.password = 'Password is Required';
    } else if (!PASS_REGEXP.test(values.password)) {
      errors.password = 'Password has to consist  8 or more chars';
    }
    //*First Name
    if (!values.firstName) {
      errors.firstName = 'First name  is Required';
    }
    //*Last Name
    if (!values.lastName) {
      errors.lastName = 'Last name  is Required';
    }
    //*Phone number
    if (!values.phone) {
      errors.phone = 'Phone  is Required';
    } else if (!PHONE_REGEXP.test(values.phone)) {
      errors.phone =
        'Phone number start with a plus symbol (but not necessarily) and only allow digits';
    }

    return errors;
  };

  const onSubmit = (
    values: FormValuesType,
    { resetForm, setErrors, setSubmitting }: FormikHelpers<FormValuesType>
  ) => {
    axios
      .post('http://localhost:3000/users/registration', values)
      .then(({ data }) => {
        // обработка успешного запроса
        resetForm({ values: initialValues });

        console.log(data);
      })
      .catch(({ response }) => {
        // обработка ошибки
        if (response.status === 500) {
          return console.log('Server error!!!!!!!!!!!!!!!!!');
        }
        setErrors(response.data);
        //console.log(response.data);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className={styles.form}>
      <h1 className={styles.wrapper}>Form page</h1>
      <Formik
        initialValues={initialValues}
        validate={validation}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <label htmlFor="firstName">
              First Name
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
              {touched.firstName && errors.firstName && (
                <div>{errors.firstName}</div>
              )}
            </label>

            <label htmlFor="lastName">
              Last Name
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
              {touched.lastName && errors.lastName && (
                <div>{errors.lastName}</div>
              )}
            </label>

            <label htmlFor="email">
              Email
              <input
                id="email"
                name="email"
                placeholder="john@acme.com"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {touched.email && errors.email && <div>{errors.email}</div>}
            </label>
            <label htmlFor="phone">
              Phone
              <input
                id="phone"
                name="phone"
                placeholder="+22222222222"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              {touched.phone && errors.phone && <div>{errors.phone}</div>}
            </label>
            <label htmlFor="password">
              Password
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {touched.password && errors.password && (
                <div>{errors.password}</div>
              )}
            </label>

            <button type="submit" disabled={isSubmitting}>
              <span>Submit</span>
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Registration;
