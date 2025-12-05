import "./Advertisement.css"

export default function Advertisement({imgSrc, details, btnLink}) {
    const openLink = () => window.open(btnLink, "_blank");

    return (
        <div className="ad-div">
            <img className="ad-img"
                onClick={openLink}
                src={imgSrc} alt="Advertisement"/>
            <span className="ad-span"
                onClick={openLink}
            >
                {details}</span>
        </div>
    );
}