import React, { useCallback, useState } from 'react'
import '../../styles/Bottombar.css'
import SearchBar from './SearchBar'
export default function Bottombar(props: any) {
    const hoverClass = (e: any) => {
        e.target.classList.add("searchHovered");
    }
    const removeClass = (e: any) => {
        e.target.classList.remove("searchHovered");
    }
    const [show, showBar] = useState(false);
    if (show)
        return <div id="setexBottomBar">
            <div id="setexSearchBottom"

                onClick={() => showBar(!show)}
                onMouseOver={hoverClass}
                onMouseLeave={removeClass}>^</div>
        </div>
    else
        return <div id="setexBottomBar" >
            <SearchBar st={true}></SearchBar>
            <div id="setexSearchBottom"
                className="searchActive"
                onClick={() => showBar(!show)}>v</div>
        </div>

}