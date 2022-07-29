import React from "react";
import Logo from "../images/cat_logo_meme.png";
// Meme Generator/meme-generator/src/images/meme_generator_logo.png

export default function Navbar() {
    return(
        <>
            <div className="navbar">
                <div className="nav--logo">
                    <img src={Logo} alt="" className="img--logo" />
                    <p>Meme Generator</p>
                </div>

                <div className="module">
                    React Course - Project 3
                </div>

            </div>
        </>
    )
}