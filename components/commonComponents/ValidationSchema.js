import * as yup from 'yup';

// Username validation - first letter must be lowercase
export const usernameSchema = yup
  .string()
  .required('Username is required')
  .min(3, 'Username must be at least 3 characters');
  

// Email validation
export const emailSchema = yup
  .string()
  .required('Email is required')
  .email('Please enter a valid email address');

// Password validation
export const passwordSchema = yup
  .string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number');

// Phone validation with country code
export const phoneSchema = yup
  .string()
  .required('Phone number is required')
  .matches(
    /^\+[0-9]{1,4}[0-9]{10,14}$/, 
    'Please enter a valid phone number with country code (e.g., +911234567890)'
  );

// Create a sign-up schema
export const signUpSchema = yup.object().shape({
  username: usernameSchema,
  email: emailSchema,
  phone_number: phoneSchema,
  password: passwordSchema
});

// Create a sign-in schema - email or username
export const signInEmailSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email or username is required'),
  password: passwordSchema
});

// Create a sign-in schema - phone number
export const signInPhoneSchema = yup.object().shape({
  phone_number: phoneSchema,
  password: passwordSchema
});

export default {
  usernameSchema,
  emailSchema,
  passwordSchema,
  phoneSchema,
  signUpSchema,
  signInEmailSchema,
  signInPhoneSchema
};