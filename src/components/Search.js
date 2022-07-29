import React, { useState } from "react";
import ResizeableDiv from "./ResizeableDiv";
import memeData from "./memeData";
import Text from "./Text";
import { useSelector } from "react-redux";

export default function Search() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomMemeImage: "https://imgflip.com/s/meme/Epic-Handshake.jpg",
  });

  const [memeName, setMemeName] = useState("Epic Handshake");

  const textBoxState = useSelector((state) => state.text.data);

  const downloadImg = () => {
    let element = document.createElement("a");
    let file = new Blob([meme.randomMemeImage.toString()], { type: "image/*" });
    element.href = URL.createObjectURL(file);
    element.download = `${memeName}.jpg`;
    element.click();
  };

  console.log(meme.randomMemeImage);

  const [text, setText] = useState(0);

  let textBox_array = [];
  let movable_array = [];

  for (let i = 1; i <= text; i++) {
    textBox_array.push(<Text id={i} />);
    movable_array.push(<ResizeableDiv id={i} />);
  }

  function getMeme(e) {
    e.preventDefault();

    movable_array = [""];
    textBox_array = [""];

    let memesArray = memeData.data.memes;
    let randomNum = Math.ceil(Math.random() * 100);
    let url = memesArray[randomNum].url;
    let meme_name = memeData.data.memes[randomNum].name;

    // state-change function for meme (changing meme image)
    setMeme((prevState) => {
      return {
        ...prevState,
        randomMemeImage: url,
      };
    });

    // state-change function for memeName (changing meme name)
    setMemeName(meme_name);
  }

  return (
    <main>
      <div className="form">
        <div className="search--bar">
          <div className="text-field">
            {textBox_array.map((textbox) => {
              return textbox;
            })}
          </div>

          {/* Buttons to add / remove textfields */}
          <div className="add--remove--btn">
            {/* Add Button */}
            <button
              className="addBtn2"
              onClick={() => {
                setText((prevState) => prevState + 1);
              }}
            >
              +
            </button>

            {/* Remove Button */}
            <button
              className="addBtn2"
              onClick={() => {
                setText((prevState) => prevState - 1);
              }}
            >
              -
            </button>
          </div>

          {/* Button to save changes */}
          <button
            className="addBtn"
            onClick={() => {
              setText(0);
            }}
          >
            Save Changes
          </button>

          {/* Button to generate a new meme. */}
          <button className="searchBtn" onClick={getMeme}>
            Get a New Meme
          </button>
        </div>
      </div>

      <div className="display">
        <h2 className="memeTitle"> {memeName} </h2>

        <div className="texts">
          <h2 className="memeText--1" id="topText">
            <div id="topTextheader">
              <i class="fa-regular  fa-arrows-up-down-left-right "></i>
            </div>
            {textBoxState.text1}
          </h2>
          <img src={meme.randomMemeImage} alt="" className="disp--img" />

          <h2 className="memeText--2" id="bottomText">
            <div id="bottomTextheader">
              <i class="fa-regular  fa-arrows-up-down-left-right "></i>
            </div>
            {textBoxState.text2}
          </h2>

          <h2 className="memeText--3" id="bottomText">
            <div id="bottomTextheader">
              <i class="fa-regular  fa-arrows-up-down-left-right "></i>
            </div>
            {textBoxState.text3}
          </h2>

          <h2 className="memeText--4" id="bottomText">
            <div id="bottomTextheader">
              <i class="fa-regular  fa-arrows-up-down-left-right "></i>
            </div>
            {textBoxState.text4}
          </h2>
        </div>
      </div>

      {movable_array.map((movable) => {
        return movable;
      })}

      <div className="download">
        <button onClick={downloadImg} className="addBtn">
          Download Image
        </button>
        <a href={meme.randomMemeImage} download>
          download
        </a>
      </div>
    </main>
  );
}
