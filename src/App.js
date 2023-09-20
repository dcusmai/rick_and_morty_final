import "./styles/App/app.css";
// import Card from './components/Card.jsx' // Esto ya no se va a utilizar
import Cards from './components/Cards/Cards.jsx';
// import SearchBar from './components/SearchBar.jsx' // Esto ya no se va a utilizar
// import characters from './data.js' // Sacamos a { Rick } porque ahora traemos a todos los personajes juntos
import Nav from './components/NavBar/Nav';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Error from './components/Error/Error';
import Form from './components/Form/Form';
import Favorites from './components/Favorites/Favorites';
import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';


function App () {
  const [characters, setCharacters] = useState([]);
  const location = useLocation(); // uso el hook useLocation para obtener la propiedad pathname del obj que retorna y usarla para hacer un rednerizado condicional requerido para el Form.
  const [access, setAccess] = useState(false);
  const navigate = useNavigate();

  const username = 'diegocusmai@yahoo.com.ar'; //Con esto simulamos el usuario cargado en un servidor
  const password = '123asd';

  const login = (userData) => {
    if(userData.username === username && userData.password === password){
      setAccess(true);
      navigate('/home');
    }
  }

  useEffect(() => {
    !access && navigate('/')
  }, [access, navigate])

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
    <div className='App' style={{ padding: '0px' }}>
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

      { location.pathname === '/' ? <Form login={login}/> : <Nav onSearch={onSearch} />} {/* Renderizado condicional: muestra Form o muestra Nav       */}
      <Routes>
        <Route path='home'element={<Cards
          onClose={onClose}
          characters={characters}
          />} />
        <Route path='about' element={<About/>} />
        <Route path='detail/:detailId' element={<Detail/>} />
        <Route path='favorites' element={<Favorites/>} />
        <Route path="error" element={<Error/> } /> 
        <Route path="/" element={access ? <navigate to="/home" /> : <Form login={login} />} />
      </Routes>
      {/* <div>
        <Cards
          onClose={onClose}
          characters={characters}
        />
      </div> */}
      
      {/* <div> // Esto ya no se va a utilizar
        <SearchBar
          onSearch={(characterID) => alert(characterID)}
        />
      </div> */}
    </div>
  )
}

export default App;