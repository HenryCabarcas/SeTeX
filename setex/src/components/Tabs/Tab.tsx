import { useCallback } from "react";
import '../../styles/Tabs.css';

export default function Tab(props: any) {
    const title = props.title ? props.title : "TAB";
    const caller = props.caller;
    const setActive = useCallback(() => {
        props.caller(title)
    }, [caller, title]);

    return (
        <div onMouseDown={() => setActive()} id={`setexTab-${title}`} >
            {title}
        </div>
    )
}