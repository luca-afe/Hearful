import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { DeviceProvider } from './context/DeviceContext';
import Home from './pages/Home';
import Devices from './pages/Devices';
import Dashboard from './pages/Dashboard';
import Radar from './pages/Radar';
import History from './pages/History';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/radar" element={<Radar />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <DeviceProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </DeviceProvider>
  );
}

export default App;
