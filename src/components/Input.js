import React, {  } from "react";

function InputBox (props) {
    const {value, placeholder, handleChange, type} = props;
    return (
        <input
            className = "cls_InputBox"
            type = {type}
            value= {value}
            placeholder = {placeholder}
            onChange={(e) => handleChange(e.target.value)}
        />
    )
}

export default InputBox;