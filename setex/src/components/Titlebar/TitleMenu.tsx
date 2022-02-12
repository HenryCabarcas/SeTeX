import icon from '../../static/logo.svg';

export default function TitleMenu(props: any) {
    return (
        <div id="setexTitlebarMenu">
            <div style={{
                padding: 0
            }}>

                <img src={icon} width="auto" height="75%" alt="SeTex" />
            </div>
            <div>
                File
            </div>
            <div>
                Edit
            </div>
        </div>
    )

}