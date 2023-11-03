import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import style from './Detail.module.css';

const Detail = () => {

    const { detailId } = useParams();
    const [character, setCharacter] = useState({});

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/${detailId}`)
        .then((response) => response.json())
        .then((char) => {
            if(char.name){
                setCharacter(char);
            } else {
                window.alert("No hay personajes con ese ID");
            }
        })
        .catch((err) => {
            window.alert("No hay personajes con ese ID");
        });
        return setCharacter({});
    }, [detailId])

    return(
        <div className={style.container}>
            <div>
                <div>
                    <button>
                        <Link to='/home' >Home</Link>
                    </button>
                    <h2>Character Detail</h2>
                    <h1>Name: {character?.name}</h1>
                </div>

                <p></p>

                <div className={style.detail}>
                    <div className={style.containerImg}>
                        <img src={character?.image} alt={character.name} width={150}/>
                    </div>

                    <div>
                        <label htmlFor="status">Status: </label>
                        <p>{character?.status}</p>
                        <label htmlFor="specie">Specie: </label>
                        <p>{character?.species}</p>
                        <label htmlFor="gender">Gender: </label>
                        <p>{character?.gender}</p>
                        <label htmlFor="origin">Origin: </label>
                        <p>{character?.origin?.name}</p>
                        <label htmlFor="location">Location: </label>
                        <p>{character?.location?.name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;