// =========================
// src/App.tsx
// =========================
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DiademList from "./pages/DiademList";
import {DiademDetails} from "./pages/DiademDetails";
import Navbar from "./components/Navbar";
import { TiaraPage } from "./pages/TiaraPage";
import RenataPage from "./pages/RenataPage";
import RenataPage1 from "./pages/RenataPage1";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<DiademList />} />
        <Route path="/diadem/:id" element={<DiademDetails />} />
        <Route path="/tiara/:id" element={<TiaraPage />} />
        <Route path="/renat" element={<RenataPage />} />
        <Route path="/renat1" element={<RenataPage1 />} />
      </Routes>
    </BrowserRouter>
  );
}