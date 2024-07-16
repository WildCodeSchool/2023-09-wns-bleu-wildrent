import { ReactNode, createContext, useCallback, useState, useContext } from 'react';

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
    console.log('Closing alert');
    setAlertOpen(false);
  }, []);

  const showAlert = useCallback(
    (type: 'success' | 'error' | 'warning' | 'info', message: string, duration: number) => {
      console.log('Showing alert:', type, message, duration);
      console.log('Showing alert:', type, message, duration);
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

  return (
    <AlertContext.Provider value={{ showAlert, closeAlert, alertOpen, alertType, alertMessage }}>
      {children}
      {alertOpen && (
        <div className="toast toast-end">
          <div className={`alert alert-${alertType}`}>
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
