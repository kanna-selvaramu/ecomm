import React , {  } from "react";
import StarRatings from 'react-star-ratings';

export default function ProductDescription({detail, onBackPress}) {
    return (
        <div className = "cls_pdpWrapper">
            <div className = "cls_pdpHeaderWrapper">
                <div className = "cls_pdpBack" onClick = {onBackPress}>
                    Back
                </div>
                <div className = "cls_pdptitle">Product Description Page</div>
            </div>
            <div className = "cls_pdpBodyWrapper">
                <div className = "cls_pdpImgWrap">
                    <img src = {detail.image_url} />
                </div>
                <div className = "cls_pdpDetailWrap">
                    <div className = "cls_pdpName">{detail.name}</div>
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
                    <div className="cls_pdpDescription">
                        {detail.description}
                    </div>
                    <div className="pdp_addToCartBtn">
                        Add to Cart
                    </div>
                </div>
            </div>
        </div>
    )    
}