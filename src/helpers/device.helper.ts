import DeviceInfo from 'react-native-device-info';

export const getDeviceId = async () => {
  const deviceId = await DeviceInfo.getUniqueId();
  // console.log('Device uniqueID: ', deviceId?.toLowerCase());
  return deviceId?.toLowerCase();
};

export const isPhysicDevice = async (): Promise<boolean> => {
  const isEmulator = await DeviceInfo.isEmulator();
  return !isEmulator;
};
