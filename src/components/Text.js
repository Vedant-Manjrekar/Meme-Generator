import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeText } from "../features/textSlice";

export default function Text(props) {
  const text = useSelector((state) => state.text.data);

  const dispatch = useDispatch();

  function updateText(event) {
    const { name, value } = event.target;

    console.log(name, value);

    dispatch(
      changeText({
        ...text,
        [name]: value,
      })
    );
  }

  return (
    <>
      <input
        type="text"
        name={`text${props.id}`}
        id={props.id}
        onChange={updateText}
        placeholder="Add Text"
        // value={meme.topText}
      />
    </>
  );
}
