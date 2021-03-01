import React, {  } from "react";
import StarRatings from 'react-star-ratings';

export default function ProductCard  ({onProductClick, detail, addToCartClick}) {
    
    return (
        <div className="cls_ProductCont" >
            <div className="cls_ProdImgCont">
                <img src = {detail.image_url} />
            </div>
            <div className="cls_ProdDesc" onClick = { onProductClick }>
                <div className="cls_ProdName">
                    {detail.name}
                </div>
                <div className="cls_ProdDescription">
                    {detail.description}
                </div>
                <StarRatings
                    rating={detail.rating}
                    starDimension="20px"
                    starSpacing="2px"
                    starRatedColor="#478ac9"
                    starEmptyColor="#badeff"
                />
                <div className="cls_ProdPrice">
                    {detail.price}
                    <span className="cls_ProdOldPrice"> {detail.old_price}</span>
                </div>
            </div>
            <div className="addToCartBtn" onClick = {addToCartClick}>
                Add to Cart
            </div>
        </div>
    )
}