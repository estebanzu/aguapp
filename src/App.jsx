import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Colores from "./pages/Colores";
import Numeros from "./pages/Numeros";
import Cuerpo from "./pages/Cuerpo";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colores" element={<Colores />} />
          <Route path="/numeros" element={<Numeros />} />
          <Route path="/cuerpo" element={<Cuerpo />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
