import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Meeting from "./pages/Meeting";
import Result from "./pages/Result";

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">

      <Navbar />

      <main className="flex-1">

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/meeting" element={<Meeting />} />

          <Route path="/result" element={<Result />} />

        </Routes>

      </main>

      <Footer />

    </div>
  );
}

export default App;