import React, { createContext, useContext, useState, ReactNode } from 'react';
import NotificationPopup from './NotificationPopup';

interface NotificationData {
  title: string;
  message: string;
  type?: 'success' | 'danger' | 'info';
  onPress?: () => void;
}

interface NotificationContextType {
  showNotification: (notification: NotificationData) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState<NotificationData>({
    title: '',
    message: '',
    type: 'info',
  });

  const showNotification = (notificationData: NotificationData) => {
    setNotification(notificationData);
    setVisible(true);
  };

  const hideNotification = () => {
    setVisible(false);
  };

  return (
    <NotificationContext.Provider value={{ showNotification, hideNotification }}>
      {children}
      <NotificationPopup
        visible={visible}
        title={notification.title}
        message={notification.message}
        type={notification.type}
        onClose={hideNotification}
        onPress={notification.onPress}
      />
    </NotificationContext.Provider>
  );
}; 