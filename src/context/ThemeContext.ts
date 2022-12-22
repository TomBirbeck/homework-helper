import { createContext } from 'react';

const ThemeContext = createContext<[string, (display: string) => void]>([
  'universe',
  () => {},
]);

export default ThemeContext;