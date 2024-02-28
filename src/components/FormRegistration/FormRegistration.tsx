import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, FormikErrors, FormikHelpers } from 'formik';
import InputMask from 'react-input-mask';
import axios from 'axios';
//*Styles
import styles from './FormRegistration.module.css';
//*Components
import Button from '../Button/Button';
import apiUrl from '../FormLogin/apiUrl';

type FormProps = {
  onSubmitSuccess: () => void;
};

export type FormValuesType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};

//* Regilar expretions
const EMAIL_REGEXP = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PASS_REGEXP = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const initialValues: FormValuesType = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
};

const FormRegistration = ({ onSubmitSuccess }: FormProps) => {
  //* Localization hook
  const { t } = useTranslation();

  //* State for error and success messages
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

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
    } else if (!PASS_REGEXP.test(values.password)) {
      errors.password = t('passInvalid');
    }
    //*First Name
    if (!values.firstName) {
      errors.firstName = t('fNameRequared');
    }
    //*Last Name
    if (!values.lastName) {
      errors.lastName = t('lNameRequared');
    }
    //*Phone number
    if (!values.phone) {
      errors.phone = t('phoneRequared');
    }

    return errors;
  };

  //* Form submission function
  const onSubmit = (
    values: FormValuesType,
    { resetForm, setErrors, setSubmitting }: FormikHelpers<FormValuesType>
  ) => {
    axios
      .post(`${apiUrl}/users/registration`, values)
      .then(({ data }) => {
        setSuccessMessage(t('registrationSuccess'));
        resetForm({ values: initialValues });
        onSubmitSuccess();
        console.log(data);
      })
      .catch(({ response }) => {
        if (response.status === 500) {
          setErrorMessage(t('serverError'));
        } else if (response.status === 400) {
          setErrorMessage(t('badRequest'));
        } else {
          setErrorMessage(`${response.status}, ${t('unknownErrors')}`);
        }
        setErrors(response.data?.message || t('unknownError'));
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
          <label htmlFor="firstName" className={styles.label}>
            {t('labelFirsName')}
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            className={styles.input}
          />
          {touched.firstName && errors.firstName && (
            <div className={styles.error}>{errors.firstName}</div>
          )}
          <label htmlFor="lastName" className={styles.label}>
            {t('labelLastName')}
            <input
              type="text"
              id="lastName"
              name="lastName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
              className={styles.input}
            />
            {touched.lastName && errors.lastName && (
              <div className={styles.error}>{errors.lastName}</div>
            )}
          </label>
          <label htmlFor="phone" className={styles.label}>
            {t('labelPhone')}
            <InputMask
              mask="+38 (999) 999-99-99"
              id="phone"
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              className={styles.input}
            />
            {touched.phone && errors.phone && (
              <div className={styles.error}>{errors.phone}</div>
            )}
          </label>

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

export default memo(FormRegistration);
