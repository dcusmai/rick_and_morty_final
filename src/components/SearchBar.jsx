import { useState } from "react";

function SearchBar({ onSearch }) {
   const [ character, setCharacter ] = useState('');

   const handleChange = (event) => {
      setCharacter(event.target.value)
   }

   return (
      <div>
         <input type='search' value={character} onChange={handleChange} />
         <button onClick={() => onSearch(character)}>Agregar</button> {/* meto mi fc onSearch en una callback para poder pasarle parámetros y que no se autoejecute. */}
      </div>
   );
}

export default SearchBar;