import '../../../styles/TabSections.css';
export default function ViewSection(props: any) {
    const label = props.label;
    return <div className="tab-content" id={label}>
        View
    </div>
}