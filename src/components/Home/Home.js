import React from "react";
import Header from "./Header/Header";
import About from "./About/About";
import Services from "./Services/Services";
import Works from "./Works/Works";
import Testimonal from "./Testimonal/Testimonal";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import SubWorks from "./SubWorks/SubWorks";
import Faq from "./FAQ/Faq";
import ServicesSlick from "./Services/ServicesSlick";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <About />
      {/* <Services /> */}
      <ServicesSlick />
      <Works />
      <SubWorks />
      <Testimonal />
      <Faq />
      <Footer />
    </div>
  );
}
