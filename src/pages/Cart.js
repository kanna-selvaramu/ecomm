import React , { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { REMOVE_FROM_CART } from "../context/action.type";
import { UserContext } from "../context/UserContext";

function Cart () {
    const [ cartData , setCartData ] = useState(JSON.parse(localStorage.getItem("cartData")));
    const [ cartTotal , setCartTotal] = useState(0);
    const { dispatch } = useContext(UserContext);

    const btnClick = ({id, atcQty}) => {
        const items = cartData.filter(item => item.id != id);
        setCartData(items);
        localStorage.setItem("cartData", JSON.stringify(items));
        console.log(items, "remove", cartData)
        dispatch({
            type: REMOVE_FROM_CART,
            payload: atcQty
        });
        // removeFromCart(id);
    }

    useEffect(() => {
        setCartTotal(cartData.reduce((a,b) => a + (b.atcQty * b.price), 0))
    },[cartData])

    return (
        <div className = "cls_CartPageWrapper">
            <Header/>
            <div className = "cls_CartBodyWrapper">
                <Link to = "/allproducts">
                    <div className = "cls_BackHome">
                        Back to Product List
                    </div>
                </Link>
                
                {   cartData.length > 0 && 
                    <>
                    <div className = "cls_Title">
                        Items in Your Cart
                    </div> 
                    <div className = "cls_BodyWrapper">
                        {
                            cartData.map( (item, key) => {
                                
                                return (
                                    <div className = "cls_CartProdCont" key={key}>
                                        <div className = "cls_CartProdImage">
                                            <img src = {item.image_url} />
                                        </div>
                                        
                                        <div className = "cls_CartProdDetailCont">
                                            <div className = "cls_CartDesc">
                                                <div className = "cls_cartProdName"> {item.name} </div>
                                                <div className = "cls_cartPriceWrapper">
                                                    <div className = "cls_cartProdPrice"> {item.price} </div> 
                                                    <div className = "cls_cartProdQty"> {item.atcQty} </div> 
                                                    <div className = "cls_cartProdPriceTotal"> {item.price * item.atcQty} </div> 
                                                </div>
                                            </div>
                                            <div className = "cls_cartRemove" onClick = { () => btnClick(item)}>
                                                Remove from Cart
                                            </div>
                                        </div>
                                    </div>
                                )
                                
                            })
                        }
                        <div className = "cls_TotalCont">
                            <div className = "cls_CartTotal">
                                Total {cartTotal}
                            </div>
                        </div>
                    </div>
                    </>
                }
                {
                    cartData.length === 0 && 
                    <div className = "cls_CartEmptyMessage">
                        Your cart is Empty
                    </div>
                }
            </div>
        </div>
    )
}

export default Cart;