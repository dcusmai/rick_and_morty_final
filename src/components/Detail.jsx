import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
        <div>
            <button>
                <Link to='/home' >Home</Link>
            </button>
            <h2>Character Detail</h2>
            <p></p>
            <img src={character?.image} alt={character.name} width={150}/>
            <h1>Name: {character?.name}</h1>
            <p>Status: {character?.status}</p>
            <p>Specie: {character?.species}</p>
            <p>Gender: {character?.gender}</p>
            <p>Origin: {character?.origin?.name}</p>
            <p>Location: {character?.location?.name}</p>
        </div>
    )
}

export default Detail;