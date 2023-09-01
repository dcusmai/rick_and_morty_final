import SearchBar from '../SearchBar/SearchBar';
//import About from './About';
import { Link } from 'react-router-dom';
import style from './Nav.module.css';

const Nav = ({ onSearch }) => {
    return(
        <nav className={style.nav}>
            <div className={style.btns}>
                <button>
                    <Link to='/about' className={style.btn}>About</Link>
                </button>
                <button>
                    <Link to='/home' className={style.btn}>Home</Link>
                </button>
                <button>
                    <Link to='/favorites' className={style.btn}>Favorites</Link>
                </button>
                <button>
                    <Link to='/' className={style.btn}>LOGOUT</Link>
                </button>
            </div>

            <SearchBar onSearch={onSearch}/>
            
        </nav>
    )
};

export default Nav;