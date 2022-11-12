import messaging from '@react-native-firebase/messaging';
import { isPhysicDevice } from './device.helper';
import { requestNotificationPermission } from './notification.helper';

export const getFCMToken = async () => {
  const isPhysic = await isPhysicDevice();
  if (!isPhysic) {
    return Promise.reject('Must use physical device for Push Notifications');
  }

  try {
    return requestNotificationPermission()
      .then((statusResult) => {
        return statusResult;
      })
      .then((statusResult) => {
        if (!statusResult) {
          throw 'Failed to get push token for push notification!';
        }
        return messaging().getToken();
      })
      .then((tokenString) => {
        // console.log('tokenString: ', tokenString);
        return tokenString;
      });
  } catch (error) {
    return Promise.reject("Couldn't check notifications permissions");
  }
};
