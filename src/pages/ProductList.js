import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Select from "../components/Select";

const localurl = "https://api.jsonbin.io/b/601a68315415b40ac22273cc/2";

function ProductList() {
    const [products , setProducts] = useState([]);
    const [category , setCategory] = useState([]);
    const [filter , setFilter] = useState("All");
    const [filterProducts , setFilterProducts] = useState([]);
    const { user , setUser } = useContext(UserContext);
    const fetchData = async () => {
        const { data } = await axios.get(localurl, {});
        console.log("photos", data); 
        let arr = []; 
        data.map( item => {
            console.log("test", arr.indexOf(item.category) )
            if(arr.indexOf(item.category) == -1) 
                arr.push(item.category)
        })
        setProducts(data);
        setCategory(arr);
        
    }

    const onFilterSelect = (event) => {
        setFilter(event.target.value);
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
                                <ProductCard detail = {item} key = {item.id} />
                            ))
                            : 
                            filterProducts.map(item =>(
                                <ProductCard detail = {item} key = {item.id} />
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
    
    
}

export default ProductList;