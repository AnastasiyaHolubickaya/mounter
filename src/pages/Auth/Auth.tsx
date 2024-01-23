//*Base
import { Formik, FormikErrors, FormikHelpers } from 'formik';
//*Styles
import styles from './Auth.module.css';
import axios from 'axios';
//* Types
type FormValuesType = {
  email: string;
  password: string;
};

//* Regilar expretions
const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const initialValues: FormValuesType = {
  email: '',
  password: '',
};

const Auth = () => {
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
    }

    return errors;
  };

  const onSubmit = (
    values: FormValuesType,
    { resetForm, setErrors, setSubmitting }: FormikHelpers<FormValuesType>
  ) => {
    axios
      .post('http://localhost:3000/users/auth', values, {
        headers: {
          Authorization: localStorage.getItem('token') || '',
        },
      })
      .then(({ data }) => {
        localStorage.setItem('token', data.token);
        resetForm({ values: initialValues });
      })
      .catch(({ response }) => {
        if (response.status === 500) {
          return console.log('Server error');
        }
        setErrors(response.data);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <h1 className={styles.wrapper}>Form Auth page</h1>
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

export default Auth;
