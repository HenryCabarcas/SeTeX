import '../../../styles/TabSections.css';
export default function InsertSection(props: any) {
    const label = props.label;
    return <div className="tab-content" id={label}>
        Insert
    </div>
}