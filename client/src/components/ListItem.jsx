import React from "react";

export default function ListItem () {
    
    return(
        <div className="list-item">
            <li id="li-entry">this is a component entry</li>
            <button className="li-button">Edit</button>
            <button className="li-button">Delete</button>
        </div>
    )
}