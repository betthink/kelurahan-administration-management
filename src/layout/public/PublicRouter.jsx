import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PagePermohonanSuratPengantar from "./pages/PagePermohonanSuratPengantar";
const PublicRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/HomePage" element={<HomePage />} />
        <Route
          path="/PagePermohonanSuratPengantar"
          element={<PagePermohonanSuratPengantar />}
        />
      </Routes>
    </Router>
  );
};

export default PublicRouter;
