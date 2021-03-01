import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Select from "../components/Select";
import ProductDescription from "./ProductDescription";
import { ADD_TO_CART } from "../context/action.type";

const localurl = "https://api.jsonbin.io/b/601a68315415b40ac22273cc/2";

function ProductList() {
    const [products , setProducts] = useState([]);
    const [category , setCategory] = useState([]);
    const [filter , setFilter] = useState("All");
    const [pdpView , setPdpView] = useState(false);
    const [filterProducts , setFilterProducts] = useState([]);
    const [pdp, setPdp] = useState({});

    const { user , setUser, cart_count , dispatch } = useContext(UserContext);
    const fetchData = async () => {
        const { data } = await axios.get(localurl, {});
        console.log("photos", data); 
        let arr = []; 
        data.map( item => {
            if(arr.indexOf(item.category) == -1) 
                arr.push(item.category)
        })
        setProducts(data);
        setCategory(arr);
    }

    const onFilterSelect = (event) => {
        setFilter(event.target.value);
    }

    const onProductClick = (itemDetail) => {
        console.log("itemDetails", itemDetail)
        setPdpView(true);
        setPdp(itemDetail);
    }

    const onBackPress = () => {
        setPdpView(false);
        setPdp({});
    }
  
    const addToCart = (item) => {
        const data = localStorage.getItem('cartData') !== null ? JSON.parse(localStorage.getItem('cartData')) : [];
        let noStock = false;
        let inCartProd = data.find( eachProd => {
            if(eachProd.id === item.id) {
                if(eachProd.stock_availiblity === eachProd.atcQty)
                {
                    noStock = true;
                    return;
                }
                else {
                    eachProd.atcQty++;
                    return eachProd;
                }
            }
        })
        // let atcQty = 0;
        if(inCartProd === undefined) {
            const arr = {...item , "atcQty" : 1};
            localStorage.setItem('cartData' , JSON.stringify([...data, arr]));
        }
        else {
            localStorage.setItem('cartData' , JSON.stringify(data));
        }
        if(noStock === true) 
            alert("No Stock");
        else 
            dispatch({
                type: ADD_TO_CART
            });
    }

    useEffect(() => {
        if(filter != "")
        {
            let arr = products.filter(item => {
                return ( item.category === filter )
            });
            setFilterProducts(arr);
            console.log("filter", arr);
        }
    }, [filter])

    useEffect(() => {
        fetchData();
    },[])

    if (user === null ) {
        console.log("user", user);
        return <Redirect to="/" />;
    }
    else {
        return (
            <div className = "cls_MainContWrapper">
                <Header/>
                <div className="cls_BodyWrapper">
                    {
                        pdpView === false && 
                        <>
                            <div className="cls_Title">
                                Product List
                            </div>
                            <div className = "cls_ProductFilterWrapper">
                                <Select defVal = "All" selectedValue = {filter} handleChange = {onFilterSelect} options = {category} />
                            </div>
                            <div className = "cls_ProductsWrapper">
                                {
                                    filter === "All" ?
                                    products.map(item => (
                                        <ProductCard detail = {item} key = {item.id} onProductClick = {() => onProductClick(item)} addToCartClick = {() => addToCart(item)}/>
                                    ))
                                    : 
                                    filterProducts.map(item =>(
                                        <ProductCard detail = {item} key = {item.id} onProductClick = {() => onProductClick(item)} addToCartClick = {() => addToCart(item)}/>
                                    ))
                                }
                            </div>
                        </>
                    }
                    {
                        pdpView === true && 
                        <ProductDescription detail = {pdp} onBackPress = {onBackPress}/> 
                    }
                </div>
            </div>
        )
    }
    
    
}

export default ProductList;