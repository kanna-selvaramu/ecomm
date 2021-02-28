import React, {  } from "react";

export default function Header() {
    return(
        <div className = "cls_Header">
            {/* <div className = "cls_Pancake"></div> */}
            <div className = "cls_LogoHolder">Ecommm</div>
            <div className = "cls_SearchWrapper">
                <input className = "cls_SearchCont" placeholder = "Search products..." />
            </div>
            <div className = "cls_LogoutWrapper">
                Logout
            </div>
            <div className = "cls_CartWrapper">
                <div className = "cls_cartIcon"></div>
            </div>
        </div>
    )
}