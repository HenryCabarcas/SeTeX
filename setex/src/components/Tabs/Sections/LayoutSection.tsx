import '../../../styles/TabSections.css';
export default function LayoutSection(props: any) {
    const label = props.label;
    return <div className="tab-content" id={label}>
        Layout
    </div>
}