import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Function to determine if the device is a tablet
export const isTablet = () => {
  const aspectRatio = height / width;
  return Platform.isPad || (Platform.OS === 'android' && aspectRatio < 1.6 && Math.max(width, height) >= 600);
};
