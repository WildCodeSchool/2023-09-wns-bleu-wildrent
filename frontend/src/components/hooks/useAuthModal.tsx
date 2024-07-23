import { useState } from 'react';

export const useAuthModal = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
    setShowLoginForm(false);
  };

  const closeModal = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  return {
    showLoginForm,
    showRegisterForm,
    handleLoginClick,
    handleRegisterClick,
    closeModal,
  };
};
