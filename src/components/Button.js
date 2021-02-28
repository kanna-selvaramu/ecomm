import React, {  } from "react";

function Button (props) {
    const {value, onBtnClick} = props;
    return (
        <button className = "cls_SubmitBtn" onClick={onBtnClick}>
            {value}
        </button>
    )
}

export default Button;