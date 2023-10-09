import Navbar from "../components/navbar/Navbar";
import HomeForm from "../components/homeForm/HomeForm";
import BackgroundHeader from "../components/backgroundHeader/BackgroundHeader";
import FavorisDestination from "../components/favorisDestinations/FavorisDestinations";
import SiteDescription from "../components/siteDescription/siteDescription";

function Home(){
    return (
        <>
            <Navbar />
            <BackgroundHeader />
           <HomeForm />
           <FavorisDestination/>
           <SiteDescription />  
            
        </>
    )
}


export default Home;