import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addFavorite, deleteFavorite } from '../redux/actions';

export default function Card({ name, gender, onClose, species, image, id }) { // Acá Card recibe por párámetro props y hago destructuring. Los valores de estas propiedades le llegan desde App: props --> {name: '', species: '', gender: '', image: '', onClose: fn}
   const dispatch = useDispatch();

   const myFavorites = useSelector(state => state.myFavorites)

   const [isFav, setIsFav] = useState(false);

   const handleFavorite = () => {
      if(isFav){
         setIsFav(false);
         dispatch(deleteFavorite(id))
      }
      else{
         setIsFav(true);
         dispatch(addFavorite({ name, gender, onClose, species, image, id })) // le paso props por destructuring porque así lo puse en Card
      }
   }

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if(fav.id === id) { // Si no hubiera hecho destructuring en Card, acá sería props.id en lugar de id.
            setIsFav(true);
         }
      });
   }, [myFavorites, id]); // React me hace incluir id en el array de dependencias, sino me da error.

   return (
      <div>
         {
            isFav ? (
               <button onClick={handleFavorite}>💖</button>
            ) : (
               <button onClick={handleFavorite}>🤍</button>
            )
         }

         <button onClick={onClose}>X</button>
         <Link to={`/detail/${id}`}>
            <h2>{name} </h2>
         </Link>
         <h2>Specie: {species} </h2>
         <h2>Gender: {gender} </h2>
         <img  src={image} alt={name} />
      </div>
   );
}
