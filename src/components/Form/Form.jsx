import { useState } from 'react';
import validation from './validation';
import style from './Form.module.css';

const Form = ( { login }) => {

    const [ userData, setUserData ] = useState({
        username: '',
        password: ''
    })

    const handleInputChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        })
        setErrors(validation({
            ...userData,
            [event.target.name]: event.target.value
        }))
    }

    const [ errors, setErrors ] = useState({
        username: '',
        password: ''
    })

    const handleSubmit = (event) => {
        event.preventDefault(); // Esto evita que se me recargue la pag cada vez que se dispare un evento (cambio)
        login(userData)
    }

    return(
        <form onSubmit={handleSubmit} className={style.form}>

            <audio src="./rick_and_morty_intro.mp3" muted autoPlay loop controls style={{marginTop: '-4rem', marginBottom: '2rem'}}>Tu navegador no admite la etiqueta de audio.</audio>

            <p className={style.bienvenidos}>Bienvenidos!</p>

            <img src="./Rick_and_Morty.png" alt="RyM logo" className={style.front}/>  {/* NOTA: Para que renderice la imagen, las rutas relativas se interpretan en función de la ubicación del archivo HTML, no del archivo JavaScript. */}
            
            <p className={style.bienvenidos}>App</p>

            <label htmlFor="username" autoComplete='on' className={style.label}>Username: </label>
            <input type="text" name="username" value={userData.username} onChange={handleInputChange} className={style.input}/>
            {errors.username && <p style={{color:'red', fontSize:'12px'}}>{errors.username}</p>}

            <label htmlFor="password" className={style.label}>Password: </label>
            <input type="password" name="password" value={userData.password} onChange={handleInputChange} className={style.input}/>
            {errors.password && <p style={{color:'red', fontSize:'12px'}}>{errors.password}</p>}

            <div className={style.btn}>
                <button>LOGIN</button>
            </div>
        </form> 
    )
}

export default Form;