export const validateForm = (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = password.length >= 6;

  return { isEmailValid, isPasswordValid };
};
