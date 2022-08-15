import React, { useState, useEffect } from "react";
import ResizeableDiv from "./ResizeableDiv";
import memeData from "./memeData";
import Text from "./Text";
import { useSelector, useDispatch } from "react-redux";
import * as htmlToImage from "html-to-image";
import { dropChange } from "../features/settingsSlice";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import RemoveIcon from "@mui/icons-material/Remove";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useRef } from "react";

export default function Search() {
  const screenshot = () => {
    htmlToImage
      .toJpeg(document.getElementById("texts"), { quality: 1 })
      .then(function(dataUrl) {
        var link = document.createElement("a");
        link.download = `${memeName}-memeGenerator.jpeg`;
        link.href = dataUrl;
        link.click();
      });
  };

  const dropState = useSelector((state) => state.setting_drop.data);

  const dispatch = useDispatch();

  const font_style = {
    color: dropState.font_color,
    fontSize: dropState.font_size,
    fontFamily: dropState.font_family,
    textAlign: dropState.text_align,
    backgroundColor: dropState.bg_color,
    webkitTextStrokeWidth: "1px",
    webkitTextStrokeColor: dropState.txt_border,
  };

  const dropBox = {
    top: dropState.value ? "" : "-17rem",
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

  // state to populate text fields. (when +, - is clicked this state is updated accordingly)
  const [text, setText] = useState(0);

  // Array to store text fields and draggable divs when populated.
  let textBox_array = [];
  let movable_array = [];

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
      <main>
        <div className="display">
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
                />{" "}
              </p>
              <p>
                Font-Family: &nbsp;{" "}
                <input
                  onChange={changeFontFamily}
                  type="text"
                  name=""
                  id="text-size text4"
                />{" "}
              </p>
              <p>
                Text-Align: &nbsp;{" "}
                <input
                  onChange={changeAlignment}
                  type="text"
                  name=""
                  id="text-size"
                />{" "}
              </p>
            </div>
          </div>
          <h2 className="memeTitle"> {memeName} </h2>
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

        {movable_array.map((movable) => {
          return movable;
        })}

        <div className="download">
          {/* Button to generate a new meme. */}
          <button className="searchBtn" onClick={getMeme}>
            Get a New Meme &nbsp; &nbsp; {<AutorenewIcon />}
          </button>

          {/* Button to save changes */}
          <button
            className="addBtn"
            onClick={() => {
              setText(0);
            }}
          >
            Save Changes &nbsp; &nbsp;{<SaveIcon />}
          </button>
        </div>
      </main>

      <div className="form">
        <div className="search--bar">
          <div className="text-field">
            <h2>Add Text</h2>
            {textBox_array.map((textbox) => {
              return textbox;
            })}
          </div>

          {/* Buttons to add / remove textfields */}
          <div className="add--remove--btn">
            {/* Add Button */}
            <button
              className="addBtn2"
              id="add"
              onClick={() => {
                setText((prevState) => prevState + 1);
              }}
            >
              {<AddIcon />}
            </button>

            {/* Remove Button */}
            <button
              className="addBtn2"
              id="remove"
              onClick={() => {
                setText((prevState) => prevState - 1);
              }}
            >
              {<RemoveIcon />}
            </button>
          </div>

          <button onClick={screenshot} className="addBtn" id="download--btn">
            Download Meme &nbsp; {<DownloadIcon />}
          </button>
        </div>
      </div>
    </>
  );
}
