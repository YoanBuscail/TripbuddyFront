import backgroundVideo from "../../assets/178732 (Original).mp4";
import "./BackgroundHeader.css"

function BackgroundHeader(){
    return(
        <>
            <h1><span className="Tripbuddy-1">T</span><span className="Tripbuddy-2">r</span><span className="Tripbuddy-3">i</span><span className="Tripbuddy-4">p</span><span className="Tripbuddy-5">B</span>u<span className="Tripbuddy-6">d</span><span className="Tripbuddy-7">d</span><span className="Tripbuddy-8">y</span></h1>
            <div className="video-container">
            <video className="background-video" width="160%" height="" autoPlay loop muted>
                <source src={backgroundVideo} type="video/mp4" />
                Votre navigateur ne prend pas en charge les vidéos.
            </video>
            </div>
        </>
    )
}

export default BackgroundHeader;