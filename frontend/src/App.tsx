import { BrowserRouter, Routes, Route } from 'react-router'

import ClassicDraft from './pages/ClassicDraft';
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/classic" element={<ClassicDraft />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App

