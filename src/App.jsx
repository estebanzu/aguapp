import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Colores from "./pages/Colores";
import Numeros from "./pages/Numeros";
import Cuerpo from "./pages/Cuerpo";
import Formas from "./pages/Formas";
import Contar from "./pages/Contar";
import Clasificar from "./pages/Clasificar";
import Motifs from "./pages/Motifs";
import Grandeurs from "./pages/Grandeurs";
import Vocabulaire from "./pages/Vocabulaire";
import Problemes from "./pages/Problemes";
import Comptines from "./pages/Comptines";
import DefiDuJour from "./pages/DefiDuJour";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colores" element={<Colores />} />
          <Route path="/numeros" element={<Numeros />} />
          <Route path="/cuerpo" element={<Cuerpo />} />
          <Route path="/formas" element={<Formas />} />
          <Route path="/contar" element={<Contar />} />
          <Route path="/clasificar" element={<Clasificar />} />
          <Route path="/motifs" element={<Motifs />} />
          <Route path="/grandeurs" element={<Grandeurs />} />
          <Route path="/vocabulaire" element={<Vocabulaire />} />
          <Route path="/problemes" element={<Problemes />} />
          <Route path="/comptines" element={<Comptines />} />
          <Route path="/defi" element={<DefiDuJour />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
