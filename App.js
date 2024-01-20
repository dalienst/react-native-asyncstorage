import { PaperProvider } from "react-native-paper";
import BaseNavigation from "./src/navigation/BaseNavigation";
import { AuthProvider } from "./src/context/authContext";

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <BaseNavigation />
      </PaperProvider>
    </AuthProvider>
  );
}
