import "./SiteDescription.css";

import imgSiteDescription from "../../assets/road-trip-4399206_1280-removebg-preview.png";


function SiteDescription(){
    return(
       
        <section className="site-description">
            <div className="svg-site-description">
                <svg id="visual" viewBox="0 0 900 600" >
                <path d="M0 92L900 71L900 0L0 0Z" fill="#ff7f24" strokeLinecap="round" strokeLinejoin="miter"></path>
                </svg>
            </div>

            

            <div className="container-flex-site-description">
                <div className="site-description-left">
                    <h3 className="title-site-description">Organise ton voyage</h3>
                    <p> Nous simplifions la création de votre itinéraire de voyage idéal, en vous proposant des étapes uniques et des destinations incontournables. Que vous soyez du genre aventureux ou que vous préfériez des vacances relaxantes, nous avons ce qu'il vous faut, n'attendez plus, l'aventure de votre vie vous attend ! </p>
                    <button>C'est parti !</button>
                </div>
                
                <img src={imgSiteDescription} alt=""/>
                

            </div>
        </section>

    )
}

export default SiteDescription;