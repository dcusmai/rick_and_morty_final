import SearchBar from './SearchBar';
//import About from './About';
import { Link } from 'react-router-dom';

const Nav = ({ onSearch }) => {
    return(
        <nav>
            <button>
                <Link to='/about'>About</Link>
            </button>
            <button>
                <Link to='/home'>Home</Link>
            </button>
            <button>
                <Link to='/'>LOGOUT</Link>
            </button>
            <SearchBar onSearch={onSearch}/>
            <hr />
        </nav>
    )
};

export default Nav;