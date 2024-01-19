import { PaperProvider } from 'react-native-paper';
import BaseNavigation from './src/navigation/BaseNavigation';

export default function App() {
  return (
    <PaperProvider>
      <BaseNavigation/>
    </PaperProvider>
  );
}
