import '../../../styles/TabSections.css';
export default function HelpSection(props: any) {
    const label = props.label;
    return <div className="tab-content" id={label}>
        Help
    </div>
}