import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";

const localurl = "https://api.jsonbin.io/b/601a68315415b40ac22273cc/2";

function ProductList() {
    const [products , setProducts] = useState([]);
    const fetchData = async () => {
        const { data } = await axios.get(localurl, {});
        console.log("photos", data); 
        setProducts(data);
    }

    useEffect(() => {
        fetchData();
    },[])

    return (
        <div className = "cls_MainContWrapper">
            <Header/>
            <div className="cls_BodyWrapper">
                <div className="cls_Title">
                    Product List
                </div>
                <div className = "cls_ProductsWrapper">
                    {
                        products.map(item => (
                            <ProductCard detail = {item} key = {item.id} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
    
}

export default ProductList;