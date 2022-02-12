
import '../../styles/index.css'
import '../../styles/Titlebar.css';

import TitleMenu from './TitleMenu'
declare global {
    interface Window {
        api: {
            send: Function,
            sendSync: Function,
            receive: Function
        }
    }
}

export default function Titlebar(props: any) {
    //window.api.receive("window-handle", (message: String) => alert(message))
    var title = props.children;
    return (
        <div id="setexTitlebar-section">
            <div id="setexTitlebar">
                <TitleMenu />
                <div id="setexTitle">
                    {title}
                </div>
                <div id="setexTitlebarButtons">
                    <div id="setexMinimizeButton"
                        className="titlebar-button"
                        onClick={() => window.api.send("window-handle", "minimize")}></div>
                    <div id="setexRestoreButton" className="titlebar-button" onClick={() => window.api.send("window-handle", "restore")}>[]</div>
                    <div id="setexCloseButton" className="titlebar-button" onClick={() => window.api.send("window-handle", "close")} >X</div>
                </div>
            </div>
        </div>
    )
}