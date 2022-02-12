import '../../../styles/TabSections.css';
export default function DesignSection(props: any) {
    const label = props.label;
    return <div className="tab-content" id={label}>
        Design
    </div>
}