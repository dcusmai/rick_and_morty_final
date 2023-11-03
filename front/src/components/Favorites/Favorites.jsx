import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import style from './Favorites.module.css'
import { filterCards, orderCards } from "../../redux/actions";

const Favorites = () => {
    const dispatch = useDispatch();

    const myFavorites = useSelector(state => state.myFavorites);

    const handleOrder = (event) => {
        dispatch(orderCards(event.target.value))
    }

    const handleFilter = (event) => {
        dispatch(filterCards(event.target.value))
    }

    return(
        <div>
            <div>
                <select name="order" onChange={handleOrder} defaultValue="">
                    <option value="" disabled>Order By</option>
                    <option value="Ascendente">Ascendente</option>
                    <option value="Descendente">Descendente</option>
                </select>

                <select name="filter" onChange={handleFilter} defaultValue="" >
                    <option value="" disabled>Filter By</option>
                    <option value="All">All</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Genderless">Genderless</option>
                    <option value="Unknown">Unknown</option>
                </select>
            </div>
            {
                myFavorites.map((character, index) =>{
                    return(
                        <div className={style.card} key={`${character.id}-${index}`}> {/* Incluyo una key en cada Child para que no se queje React */}
                            <div className={style.front}>
                                <img  src={character.image} alt={character.name} />
                            </div>

                            <div className={style.back}>                                
                                <div>
                                    <Link to={`/detail/${character.id}`} className={style.link}>
                                        <h2 className={style.name}>{character.name}</h2>
                                    </Link>
                                </div>

                                <div className={style.characteristics}>
                                    <h2>Specie: {character.species} </h2>
                                    <h2>Gender: {character.gender} </h2>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Favorites;