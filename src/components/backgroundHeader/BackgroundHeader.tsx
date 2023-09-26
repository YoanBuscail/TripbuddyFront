import backgroundVideo from "../../assets/background-video.mp4";
import "./BackgroundHeader.css"

function BackgroundHeader(){
    return(
        <>
        <p>oki</p>
            <div className="video-container">
            <video className="background-video" width="100%" height="100%" autoPlay loop muted>
                <source src={backgroundVideo} type="video/mp4" />
                Votre navigateur ne prend pas en charge les vidéos.
            </video>
            </div>
        </>
    )
}

export default BackgroundHeader;