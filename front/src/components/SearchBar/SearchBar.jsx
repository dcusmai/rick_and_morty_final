import { useState } from "react";
import style from './SearchBar.module.css'

function SearchBar({ onSearch }) {
   const [ character, setCharacter ] = useState('');

   const handleChange = (event) => {
      setCharacter(event.target.value)
   }

   return (
      <div className={style.container}>
         <input type='search' value={character} onChange={handleChange} className={style.search}/>
         <button onClick={() => onSearch(character)}>Agregar</button> {/* meto mi fc onSearch en una callback para poder pasarle parámetros y que no se autoejecute. */}
      </div>
   );
}

export default SearchBar;