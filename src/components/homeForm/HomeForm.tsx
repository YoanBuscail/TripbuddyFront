import "./HomeForm.css"
import backgroundVideoHomeForm from "../../assets/fire.mp4";

import { useCategories } from "../../hooks/useCategories";
import {useSuggest} from "../../hooks/useSuggest";
import {useState, useEffect} from "react";

import {useNavigate} from 'react-router-dom'


function HomeForm() {
    const [selectedMapboxId, setSelectedMapboxId] = useState<any>('')
    const [selectedCategoryId, setSelectedCategoryId] = useState<any>('')
    const categories = useCategories()
    const {suggest, suggestions} = useSuggest()
    const navigate = useNavigate()
   

    const handleSuggest = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        const selected = suggestions.find((suggestion) => suggestion.name === event.target.value)
        if(selected) setSelectedMapboxId(selected.mapbox_id)
        suggest(event.target.value, selectedCategoryId)
            
    }

    const handleSelectCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
        const category = categories.find((category) => category.name === event.target.value)
        setSelectedCategoryId(category.canonical_id)
        if(selectedMapboxId) suggest(selectedMapboxId, selectedCategoryId)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const params = new URLSearchParams()
        params.append('mapboxId', selectedMapboxId)
        navigate(`/itineraires?${params.toString()}`)
    }

useEffect(() => {
console.log(selectedCategoryId)
}, [selectedCategoryId])
    return (
        <>
            <section className="home-form-itineraries">
                <video className="background-video-home-form" width="" height="" autoPlay loop muted>
                    <source src={backgroundVideoHomeForm} type="video/mp4" />
                    Votre navigateur ne prend pas en charge les vidéos.
                </video>


                <div className="search-form-home">
                    <form onSubmit={handleSubmit}>
                        <input list="suggestions" className="search-form-home-input-text" type="text" placeholder="recherche ta destination" onChange={handleSuggest} />
                        <datalist id="suggestions">
                            {suggestions.map((suggestion) => (
                                <option key={suggestion.mapbox_id} value={suggestion.name} />
                            ))}
                        </datalist>
                        <input list="categories" className="search-form-home-input-text home-category" type="text" placeholder="choisi la catégorie" onChange={handleSelectCategory}/>
                        <datalist id="categories">
                            {categories.map((category) => (
                                <option key={category.canonical_id} value={category.name} />
                            ))}
                        </datalist>
                        
                            <button className="search-form-home-submit">GO</button>
                       

                    </form>
                </div>

            </section>
        </>
    )
}

export default HomeForm;