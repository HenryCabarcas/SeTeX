import { useEffect, useState } from "react";

export default function SearchBar(props: any) {

    const st = props.st ? props.st : false;
    var content = "";
    const [state, setState] = useState(st);
    const readvalue = (e: any) => {
        content = e.target.value;
    }
    if (state) {
        return <div id="setexSearchContainer">
            <input type="text" id="setexSearch" onChange={readvalue} />
            <button>Search</button>
        </div>
    }
    else {
        return <div>

        </div>
    }
}