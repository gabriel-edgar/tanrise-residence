import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base width based on design (e.g. iPhone 11 ~375 width)
const scale = width / 375;

export function normalizeFontSize(size: number) {
  return Math.round(size * scale);
}

// Usage
// <Text style={{ fontSize: normalizeFontSize(14) }}>Dynamic Font</Text>
