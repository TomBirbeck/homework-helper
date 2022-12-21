import { createContext } from 'react';

const ThemeContext = createContext<[string, (theme: string) => void]>([
  'universe',
  () => {},
]);

export default ThemeContext;