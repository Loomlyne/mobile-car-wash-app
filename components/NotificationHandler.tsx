import * as Notifications from 'expo-notifications';
import { router } from 'expo-router';
import { useEffect, useRef } from 'react';

export default function NotificationHandler() {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    // Listen for incoming notifications while app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
      // You can handle foreground notifications here
      // For example, show an in-app notification
    });

    // Listen for user tapping on notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
      
      const data = response.notification.request.content.data;
      
      // Handle navigation based on notification type
      if (data?.related_type === 'order') {
        // Navigate to order details or history
        router.push('/OrderHistory');
      } else if (data?.related_type === 'promo') {
        // Navigate to offers or services
        router.push('/ServicesScreen');
      } else if (data?.related_type === 'reminder') {
        // Navigate to bookings or schedule
        router.push('/(tabs)/Bookings');
      } else {
        // Default navigation
        router.push('/(tabs)');
      }
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return null; // This component doesn't render anything
} 