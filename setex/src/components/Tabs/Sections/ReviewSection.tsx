import '../../../styles/TabSections.css';
export default function ReviewSection(props: any) {
    const label = props.label;
    return <div className="tab-content" id={label}>
        Review
    </div>
}