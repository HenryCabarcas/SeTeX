import '../../../styles/TabSections.css';
export default function HomeSection(props: any) {
    const label = props.label;
    return <div className="tab-content" id={label}>
        Home
    </div>
}