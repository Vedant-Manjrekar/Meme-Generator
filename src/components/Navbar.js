import React from "react";
import Logo from "../images/cat_logo_meme.png";
import { useDispatch, useSelector } from "react-redux";
import { dropChange } from "../features/settingsSlice";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Navbar() {
  const dispatch = useDispatch();
  const dropState = useSelector((state) => state.setting_drop.data);

  const drop = () => {
    dispatch(
      dropChange({
        value: !dropState.value,
      })
    );
  };

  return (
    <>
      <div className="navbar">
        <div className="nav--logo">
          <img src={Logo} alt="" className="img--logo" />
          <p>Meme Generator</p>
        </div>

        <div className="module" align="center" onClick={drop}>
          Settings &nbsp; {<SettingsIcon />}
        </div>
      </div>
    </>
  );
}
