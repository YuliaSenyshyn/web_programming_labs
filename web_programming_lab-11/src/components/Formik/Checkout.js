import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; 
import './Checkout.css'

const Checkout = () => {
  const navigate = useNavigate(); 

  const validationSchema = Yup.object({
    firstName: Yup.string()
    .max(15, 'Максимальна довжина 15 символів')
    .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ'-]+$/, "Ім'я може містити лише літери, дефіси та апострофи")
    .required("Ім'я обов'язкове"),
    lastName: Yup.string()
    .max(20, 'Максимальна довжина 20 символів')
    .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ'-]+$/, "Прізвище може містити лише літери, дефіси та апострофи")
    .required("Прізвище обов'язкове"),
    email: Yup.string()
      .matches(
        /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
        'Email повинен бути у форматі example@example.com'
      )
      .required('Email обов\'язковий'),
    phone: Yup.string()
    .matches(
        /^(\+380\d{9}|\d{10})$/,
        'Телефон має починатися з "+380" і містити 9 цифр або містити 10 цифр без коду країни'
      )
      .notOneOf(['1234567890'], 'Недійсний номер телефону')
      .required("Телефон обов'язковий"),
    address: Yup.string()
      .min(10, 'Адреса повинна бути не менше 10 символів')
      .required('Адреса обов\'язкова'),
  });
  

  const handleSubmit = (values) => {
    navigate('/success');  
  };

  return (
    <div className="checkout-container">
      <h2>Оформлення замовлення</h2>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="firstName">Ім'я:</label>
            <Field type="text" id="firstName" name="firstName" />
            <ErrorMessage name="firstName" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Призвище:</label>
            <Field type="text" id="lastName" name="lastName" />
            <ErrorMessage name="lastName" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Телефон:</label>
            <Field type="text" id="phone" name="phone" />
            <ErrorMessage name="phone" component="div" className="error" />
          </div>

          <div className="form-group">
            <label htmlFor="address">Адреса:</label>
            <Field type="text" id="address" name="address" />
            <ErrorMessage name="address" component="div" className="error" />
          </div>

          <button type="submit" className="checkout-submit-btn">
  Підтвердити замовлення
</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Checkout;
