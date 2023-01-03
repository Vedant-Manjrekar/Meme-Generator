import React, { useState, useEffect } from "react";
import ResizeableDiv from "./ResizeableDiv";
import Text from "./Text";
import { useSelector, useDispatch } from "react-redux";
import * as htmlToImage from "html-to-image";
import { dropChange } from "../features/settingsSlice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Search() {
  const dispatch = useDispatch();

  // function to download meme (edited.)
  const screenshot = () => {
    htmlToImage
      .toJpeg(document.getElementById("texts"), { quality: 1 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = `${memeName}-memeGenerator.jpeg`;
        link.href = dataUrl;
        link.click();
      });
  };

  // state for managing settings of text.
  const dropState = useSelector((state) => state.setting_drop.data);

  // style for text.
  const font_style = {
    color: dropState.font_color,
    fontSize: dropState.font_size,
    fontFamily: dropState.font_family,
    textAlign: dropState.text_align,
    backgroundColor: dropState.bg_color,
    webkitTextStrokeWidth: "1px",
    webkitTextStrokeColor: dropState.txt_border,
  };

  // visiblity of settings.
  const dropBox = {
    display: dropState.value ? "flex" : "none",
  };

  // functions to change font[size, color, family].
  const changeFontColor = () => {
    const font_color = document.getElementById("text1").value;

    dispatch(
      dropChange({
        ...dropState,
        font_color,
      })
    );
  };

  const changeFontSize = (e) => {
    const font_size = e.target.value;

    dispatch(
      dropChange({
        ...dropState,
        font_size,
      })
    );
  };

  const changeFontFamily = (e) => {
    const font_family = e.target.value;

    dispatch(
      dropChange({
        ...dropState,
        font_family,
      })
    );
  };

  const changeAlignment = (e) => {
    const text_align = e.target.value;

    dispatch(
      dropChange({
        ...dropState,
        text_align,
      })
    );
  };

  const changeBgColor = (e) => {
    const bg_color = e.target.value;

    dispatch(
      dropChange({
        ...dropState,
        bg_color,
      })
    );
  };
  const changeTxtBorder = (e) => {
    const txt_border = e.target.value;

    dispatch(
      dropChange({
        ...dropState,
        txt_border,
      })
    );
  };

  // accesing global state (using redux toolkit) for accesing state change made in Text component.
  const textBoxState = useSelector((state) => state.text.data);

  // Arrays to store text fields and draggable divs when populated.
  let textBox_array = [];
  let movable_array = [];

  // state to populate text fields. (when +, - is clicked this state is updated accordingly)
  const [text, setText] = useState(1);

  // logic for generating text fields on run-time.
  for (let i = 1; i <= text; i++) {
    textBox_array.push(<Text id={i} />);
    movable_array.push(
      <ResizeableDiv id={i} onClick={changeFontColor} key={i} />
    );
  }

  // state for storing random-meme link.
  const [meme, setMeme] = useState({
    randomMemeImage: "https://imgflip.com/s/meme/Epic-Handshake.jpg",
  });

  // state for meme name.
  const [memeName, setMemeName] = useState("Epic Handshake");

  // state for storing meme data.
  const [allMeme, setAllMeme] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMeme(data));
  }, []);

  // logic for generating memes.
  function getMeme(e) {
    e.preventDefault();

    let randomNum = Math.ceil(Math.random() * 100);
    let url = allMeme.data.memes[randomNum].url;
    let meme_name = allMeme.data.memes[randomNum].name;

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
    <>
      <h2 className="memeTitle"> {memeName} </h2>
      <main>
        <div className="download">
          {/* Button to generate a new meme. */}
          <button className="searchBtn btn" onClick={getMeme}>
            New Meme
          </button>

          <button
            className="addBtn btn"
            onClick={() => {
              setText(0);
            }}
          >
            Save Changes
          </button>

          <button
            onClick={screenshot}
            className="addBtn btn"
            id="download--btn"
          >
            Download
            {/* {<DownloadIcon />} */}
          </button>
        </div>
        <div className="display">
          {/* Settings drop box */}
          <div className="drop">
            <div className="stng" style={dropBox}>
              <p>
                Font-Color: &nbsp;{" "}
                <input
                  onChange={changeFontColor}
                  type="color"
                  name=""
                  id="text1"
                />{" "}
              </p>
              <p>
                Background-Color: &nbsp;{" "}
                <input
                  onChange={changeBgColor}
                  type="color"
                  name=""
                  id="text2"
                />{" "}
              </p>
              <p>
                Text-Border: &nbsp;{" "}
                <input
                  onChange={changeTxtBorder}
                  type="color"
                  name=""
                  id="text2"
                />{" "}
              </p>
              <p>
                Font-Size: &nbsp;{" "}
                <input
                  onChange={changeFontSize}
                  type="text"
                  name=""
                  id="text-size text3"
                  placeholder="font-size"
                />{" "}
              </p>
              <p>
                Font-Family: &nbsp;{" "}
                <input
                  onChange={changeFontFamily}
                  type="text"
                  name=""
                  id="text-size text4"
                  placeholder="font-family"
                />{" "}
              </p>
              <p>
                Text-Align: &nbsp;{" "}
                <input
                  onChange={changeAlignment}
                  type="text"
                  name=""
                  id="text-size"
                  placeholder="alignment"
                />{" "}
              </p>
            </div>
          </div>

          {/* Positions for resizable divs */}
          <div className="texts" id="texts">
            <h2 className="memeText--1" id="topText" style={font_style}>
              <div id="topTextheader">
                <i class="fa-regular  fa-arrows-up-down-left-right "></i>
              </div>
              {textBoxState.text1}
            </h2>

            <img
              src={meme.randomMemeImage}
              id="disp--img"
              alt=""
              className="disp--img"
            />

            <h2 className="memeText--2" id="bottomText" style={font_style}>
              <div id="bottomTextheader">
                <i class="fa-regular  fa-arrows-up-down-left-right "></i>
              </div>
              {textBoxState.text2}
            </h2>

            <h2 className="memeText--3" id="bottomText" style={font_style}>
              <div id="bottomTextheader">
                <i class="fa-regular  fa-arrows-up-down-left-right "></i>
              </div>
              {textBoxState.text3}
            </h2>

            <h2 className="memeText--4" id="bottomText" style={font_style}>
              <div id="bottomTextheader">
                <i class="fa-regular  fa-arrows-up-down-left-right "></i>
              </div>
              {textBoxState.text4}
            </h2>
          </div>
        </div>

        {/* Generating movable divs */}
        {movable_array.map((movable) => {
          return movable;
        })}
      </main>

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
              className="addBtn2 btn"
              id="add"
              onClick={() => {
                setText((prevState) => prevState + 1);
              }}
            >
              {<AddIcon />}
            </button>

            {/* Remove Button */}
            <button
              className="addBtn2 btn"
              id="remove"
              onClick={() => {
                setText((prevState) => prevState - 1);
              }}
            >
              {<RemoveIcon />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
