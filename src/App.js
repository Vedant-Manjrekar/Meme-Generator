import React from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Footer from "./components/Footer";
import memeData from "./components/memeData";

export default function App() {
      return (
        <>
        
        <Navbar />

        <Search 
        
        {...memeData}
        />

        <Footer />
        
        </>
      );
}


