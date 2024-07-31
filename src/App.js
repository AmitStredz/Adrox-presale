import "./App.css";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import {Route, Routes } from "react-router-dom";

import Adrox from "./Components/Adrox";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import CookiesPolicy from "./Components/CookiesPolicy";
import TermsOfUse from "./Components/TermsOfUse";


function App() {
  useEffect(() => {
    Aos.init();
    Aos.refresh();
  }, []);

  return (
    <Routes>
      <Route path="/"element={<Adrox/>}/>
      <Route path="/privacypolicy"element={<PrivacyPolicy/>}/>
      <Route path="/cookiespolicy"element={<CookiesPolicy/>}/>
      <Route path="/termsofuse"element={<TermsOfUse/>}/>
    </Routes>
  );
}

export default App;
