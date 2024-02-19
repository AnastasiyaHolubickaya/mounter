import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, FormikErrors, FormikHelpers } from 'formik';
import axios from 'axios';
//*Styles
import styles from './FormLogin.module.css';
//*Components
import Button from '../../components/Button/Button';
//*Context
import AuthContext from '../../authContext';

//* Types
type FormValuesType = {
  email: string;
  password: string;
};

type FormProps = {
  onSubmitSuccess: () => void;
};

//* Regular expretions
const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const initialValues: FormValuesType = {
  email: '',
  password: '',
};

const FormLogin = ({ onSubmitSuccess }: FormProps) => {
  const { t } = useTranslation();

  const { setIsAuthenticated } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validation = (values: FormValuesType) => {
    const errors: FormikErrors<FormValuesType> = {};
    //*Email
    if (!values.email) {
      errors.email = t('emailRequared');
    } else if (!EMAIL_REGEXP.test(values.email)) {
      errors.email = t('emailInvalid');
    }
    //*Password
    if (!values.password) {
      errors.password = t('passRequared');
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
        setSuccessMessage(t('authorizationSuccess'));
        setIsAuthenticated(true);
        onSubmitSuccess();
        resetForm({ values: initialValues });
      })
      .catch(({ response }) => {
        if (response.status === 500) {
          setErrorMessage(t('serverError'));
        } else if (response.status === 400) {
          if (response.data.messagePass) {
            setErrorMessage(t('messagePass'));
          }
          if (response.data.messageMail) {
            setErrorMessage(t('messageMail'));
          }
        } else {
          setErrorMessage(t('unknownErrors'));
        }
        setErrors(response.data?.message || t('unknownErrors'));
        setIsAuthenticated(false);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
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
          <label htmlFor="email" className={styles.label}>
            {t('labelEmail')}
          </label>
          <input
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className={styles.input}
          />
          {touched.email && errors.email && (
            <div className={styles.error}>{errors.email}</div>
          )}
          <label htmlFor="password" className={styles.label}>
            {t('labelPassword')}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className={styles.input}
          />
          {touched.password && errors.password && (
            <div className={styles.error}>{errors.password}</div>
          )}
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          {successMessage && (
            <div className={styles.success}>{successMessage}</div>
          )}
          <Button
            value={t('buttonValueSubmit')}
            type="submit"
            disabled={isSubmitting}
          ></Button>
        </form>
      )}
    </Formik>
  );
};

export default FormLogin;
