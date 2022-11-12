import notifee, { AuthorizationStatus, NotificationSettings } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import { isPhysicDevice } from './device.helper';

export const checkNotificationsPermission = async (): Promise<boolean> => {
  const isPhysic = await isPhysicDevice();
  if (!isPhysic) {
    return false;
  } else {
    const { authorizationStatus }: NotificationSettings = await notifee.getNotificationSettings();
    return authorizationStatus >= AuthorizationStatus.AUTHORIZED;
  }
};

export const requestNotificationPermission = async (): Promise<boolean> => {
  // const { authorizationStatus }: NotificationSettings = await notifee.requestPermission({
  //   alert: true,
  //   sound: true,
  //   badge: true,
  //   provisional: true, // Sets whether provisional permissions are granted
  // });
  // Request permissions (required for iOS)
  const { authorizationStatus }: NotificationSettings = await notifee.requestPermission();
  return authorizationStatus >= AuthorizationStatus.AUTHORIZED;
};

export const registerDeviceForRemoteMessages = async () => {
  // Register the device with FCM - only iOS
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging().registerDeviceForRemoteMessages();
  }
};
