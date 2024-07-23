import React, { ReactNode, createContext, useCallback, useState, useContext } from 'react';
import clsx from 'clsx';

type AlertContextType = {
  showAlert: (
    type: 'success' | 'error' | 'warning' | 'info',
    message: string,
    duration: number,
  ) => void;
  closeAlert: () => void;
  alertOpen: boolean;
  alertType: 'success' | 'error' | 'warning' | 'info';
  alertMessage: string;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const closeAlert = useCallback(() => {
    setAlertOpen(false);
  }, []);

  const showAlert = useCallback(
    (type: 'success' | 'error' | 'warning' | 'info', message: string, duration: number) => {
      setAlertType(type);
      setAlertMessage(message);
      setAlertOpen(true);

      const timeoutId = setTimeout(() => {
        closeAlert();
      }, duration);

      return () => clearTimeout(timeoutId);
    },
    [closeAlert],
  );

  const baseClasses = 'alert text-center font-bold p-4 rounded shadow-lg';
  const alertClasses = clsx(baseClasses, {
    'bg-green-100 text-green-700': alertType === 'success',
    'bg-yellow-100 text-yellow-700': alertType === 'warning',
    'bg-red-100 text-red-700': alertType === 'error',
    'bg-blue-100 text-blue-700': alertType === 'info',
  });

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert, alertOpen, alertType, alertMessage }}>
      {children}
      {alertOpen && (
        <div className="flex toast toast-top toast-center">
          <div className={alertClasses}>
            <span>{alertMessage}</span>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};

const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export { AlertProvider, useAlert };
