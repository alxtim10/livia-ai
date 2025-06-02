import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        containerStyle={{
          bottom: 140
        }}
        toastOptions={{
          style: {
            fontSize: '12px'
          }
        }}
      />
    </BrowserRouter>
  );
}

export default App;
