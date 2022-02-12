import React, { useEffect, useState } from "react";
import Tab from './Tab'
import HomeSection from "./Sections/HomeSection";
import DesignSection from "./Sections/DesignSection";
import InsertSection from "./Sections/InsertSection";

var activeTab: String = "Home";
var tabTitles = [
    "Home",
    "Insert",
    "Design",
    "Layout",
    "References",
    "Review",
    "View",
    "Help"
]

export default function Tabs(props: any) {

    let tabs = tabTitles.map((item) => {
        return <Tab title={item} caller={updateTab} active={activeTab} key={`setexTab-${item}`} />
    });

    const [active, selectTab] = useState(activeTab);
    useEffect(() => { updateTab(active); }, []);

    function updateTab(tab: String) {
        activeTab = tab;
        var _tabs = document.getElementById("setexTabTitles");
        if (_tabs !== null) {
            for (var i = 0; i < _tabs.children.length; i++) {
                let item = _tabs.children[i];
                item.classList.remove("active-tab");
                if (item.id === `setexTab-${tab}`)
                    item.classList.add("active-tab");
            }
        }
        var _content = document.getElementById("setexTabContent");
        if (_content !== null) {
            for (i = 0; i < _content.children.length; i++) {
                let item = _content.children[i];
                item.classList.add("tab-content-hidden");
                if (item.id === `tabContent-${tab}`)
                    item.classList.remove("tab-content-hidden");
            }
        }
    };

    return (
        <div id="setexTabs" onCompositionUpdate={() => selectTab(activeTab)}>
            <div id="setexTabTitles">
                {tabs}

            </div>
            <div id="setexTabContent">
                <HomeSection label={`tabContent-${tabTitles[0]}`} />
                <InsertSection label={`tabContent-${tabTitles[1]}`} />
                <DesignSection label={`tabContent-${tabTitles[2]}`} />
            </div>
        </div>
    )
}