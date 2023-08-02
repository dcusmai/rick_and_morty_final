export default function Card({name, gender, onClose, species, image}) { // Acá Card recibe por párámetro props y hago destructuring. Los valores de estas propiedades le llegan desde App
   return (
      <div>
         <button onClick={onClose}>X</button>
         <h2>{name} </h2>
         <h2>{species} </h2>
         <h2>{gender} </h2>
         <img  src={image} alt={name} />
      </div>
   );
}
