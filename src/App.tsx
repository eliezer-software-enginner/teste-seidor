import Home from './pages/Home';
import { SessionContextProvider } from './contexts/SessionContext';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <>
      <SessionContextProvider>
        <Toaster position='top-right' />
        <Home />
      </SessionContextProvider>
    </>
  );
}

export default App;
