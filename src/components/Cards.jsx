 import Card from './Card';

function Cards({ characters, onClose }) { // [{...}, {...}, {...}] characters es un array de objetos que viene de data, pasado como propiedad por App a Cards.
   
   return (
   <div>
      {
         characters.map(({id, name, species, gender, image}) => { // el método map recorre cada character (que son objetos dentro del arr characters). Entonces podemos hacer destructuring de las propiedades de character. Antes: characters.map((character) => {...}). Uso map y no forEach, porque map me retorna automáticamente un nuevo array por cada character, en cambio forEach no retorna nada.
           return <Card
           key={id} 
           name={name} // Si no hubiéramos hecho destructurin, acá debería quedar: name={character.name} y así con todos los demás.
           species={species}
           gender={gender}
           image={image}
           onClose={() => onClose(id)} // onClose no está en Characters, así que no lo puedo traer, hago una fc acá.
           ></Card>
         })
      }
   </div>
   )
}

export default Cards;
