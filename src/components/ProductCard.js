import React, {  } from "react";

export default function ProductCard  ({detail}) {
    
    return (
        <div className="cls_ProductCont">
            <div className="cls_ProdImgCont">
                <img src = {detail.image_url} />
            </div>
            <div className="cls_ProdDesc">
                <div className="cls_ProdName">
                    {detail.name}
                </div>
                <div className="cls_ProdDescription">
                    {detail.description}
                </div>
                <div className="cls_ProdPrice">
                    {detail.price}
                    <span className="cls_ProdOldPrice"> {detail.old_price}</span>
                </div>
            </div>
            <div className="addToCartBtn">
                Add to Cart
            </div>
        </div>
    )
}