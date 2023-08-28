import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const Favorites = () => {
    const { myFavorites } = useSelector(state => state)
    return(
        <div>
            {
                myFavorites.map((character) =>{
                    return(
                        <div>
                            <div>
                                <Link to={`/detail/${character.id}`}>
                                    <h2>{character.name} </h2>
                                </Link>
                            </div>
                            <div>
                                <h2>Specie: {character.species} </h2>
                                <h2>Gender: {character.gender} </h2>
                            </div>
                            <div>
                                <img  src={character.image} alt={character.name} />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Favorites;