import React from "react";

import "./Input.styles.scss";

function Input({ handleChangeInput, ...props }) {
  return <input className="input" onChange={handleChangeInput} {...props} />;
}

export default Input;
