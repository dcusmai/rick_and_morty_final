import { Link } from 'react-router-dom';

export default function Card({name, gender, onClose, species, image,id }) { // Acá Card recibe por párámetro props y hago destructuring. Los valores de estas propiedades le llegan desde App
   return (
      <div>
         <button onClick={onClose}>X</button>
         <Link to={`/detail/${id}`}>
            <h2>{name} </h2>
         </Link>
         <h2>{species} </h2>
         <h2>{gender} </h2>
         <img  src={image} alt={name} />
      </div>
   );
}
