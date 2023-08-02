import './App.css'
// import Card from './components/Card.jsx' // Esto ya no se va a utilizar
import Cards from './components/Cards.jsx'
// import SearchBar from './components/SearchBar.jsx' // Esto ya no se va a utilizar
// import characters from './data.js' // Sacamos a { Rick } porque ahora traemos a todos los personajes juntos
import Nav from './components/Nav'
import { useState } from 'react'

function App () {
  const [characters, setCharacters] = useState([]);

  const onSearch = (character) => {
    fetch(`https://rickandmortyapi.com/api/character/${character}`)
      .then((response) => response.json())
      .then((data) => {
        if(data.name) {
          setCharacters((oldChars) => [...oldChars, data]);
        } else {
          window.alert('No hay personajes con ese ID');
        }
      })
    // setCharacters([
    //   ...characters
    // ])
  }

  const onClose = (id) => {
    setCharacters(
      characters.filter(character => character.id !== id)
    )
  }

  return (
    <div className='App' style={{ padding: '25px' }}>
      {/* <div> // Esto ya no se va a utilizar
        <Card
          name={Rick.name}
          species={Rick.species}
          gender={Rick.gender}
          image={Rick.image}
          onClose={() => alert('Emulamos que se cierra la card')}
        />
      </div>
      <hr /> */}
      <Nav onSearch={onSearch} />
      <div>
        <Cards
          onClose={onClose}
          characters={characters}
        />
      </div>
      <hr />
      {/* <div> // Esto ya no se va a utilizar
        <SearchBar
          onSearch={(characterID) => alert(characterID)}
        />
      </div> */}
    </div>
  )
}

export default App;