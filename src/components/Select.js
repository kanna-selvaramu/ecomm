import React , {  } from "react";

export default function Select ({defVal , options, selectValue, handleChange}) {
    
    return (
        <select className = "cls_SelectWrapper"
            value={selectValue} 
            onChange={(e) => handleChange(e)} 
        >
            <option value={defVal}>{defVal}</option>
            {
                options.map((item, key) => {
                    return (
                        <option value={item} key={key}>{item}</option>
                    )
                })
            }
        </select> 
    )
}