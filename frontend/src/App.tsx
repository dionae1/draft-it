import { BrowserRouter, Routes, Route } from 'react-router'

import ClassicDraft from './pages/ClassicDraft';
import FearlessDraft from './pages/FearlessDraft';
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/classic" element={<ClassicDraft />} />
        <Route path="/fearless" element={<FearlessDraft />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;