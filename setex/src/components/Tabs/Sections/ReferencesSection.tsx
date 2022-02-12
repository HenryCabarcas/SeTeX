import '../../../styles/TabSections.css';
export default function ReferencesSection(props: any) {
    const label = props.label;
    return <div className="tab-content" id={label}>
        References
    </div>
}