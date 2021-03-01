import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RESET_CART } from "../context/action.type";
import { UserContext } from "../context/UserContext";

export default function Header() {
    const { user , setUser , cart_count, dispatch} = useContext(UserContext);
    const onLogoutClick = () => {
        setUser(null);
        dispatch({
            type: RESET_CART
        });
        localStorage.removeItem("user");
        localStorage.removeItem("cartData");
    }
    return(
        <div className = "cls_Header">
            <div className = "cls_LogoHolder">Ecommm</div>
            <div className = "cls_SearchWrapper">
                <input className = "cls_SearchCont" placeholder = "Search products..." />
            </div>
            <div className = "cls_LogoutWrapper" onClick = {() => onLogoutClick()}>
                Logout
            </div>
            <Link to = "/cart">
            <div className = "cls_CartWrapper">
                <div className = "cls_cartIcon">
                    <span> {cart_count} </span>
                </div>
            </div>
            </Link>
        </div>
    )
}