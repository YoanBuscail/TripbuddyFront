import "./HomeForm.css"

function HomeForm() {
    return (
        <>
        <section className="home-form-itineraries">
            <svg className="svg" viewBox="0 0 2880 320">
                <path fill="#f0f8ff" fillOpacity="1" d="M0,64L1440,256L1440,320L0,320Z"></path>
                <path fill="#f0f8ff" fillOpacity="1" d="M2880,64L1440,256L1440,320L2880,320Z"></path>
            </svg>
            <div className="search-form-home">
            <form action="">
                <input className="search-form-home-input-text" type="text"  placeholder= "recherche ta destination"/>
                <input className="search-form-home-input-text home-category"  type="text"  placeholder= "choisi la catégorie"/>
                <button className="search-form-home-submit">GO</button>
                
            </form>
            </div>
           
        </section>
        </>
    )
}

export default HomeForm;