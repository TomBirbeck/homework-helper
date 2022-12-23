import { createContext } from 'react';

const ThemeContext = createContext<[string, (display: string) => void]>([
  '',
  () => {},
]);

export default ThemeContext;