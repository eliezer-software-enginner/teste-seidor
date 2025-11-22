import { SessionContextProvider } from './contexts/SessionContext';
import Home from './pages/Home';

function App() {
  return (
    <SessionContextProvider>
      <Home />
    </SessionContextProvider>
  );
}

export default App;
