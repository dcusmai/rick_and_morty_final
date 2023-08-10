import { useState } from 'react';
import validation from './validation';

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
        <form onSubmit={handleSubmit}>
            <label htmlFor="username" autoComplete='on'>Username: </label>
            <input type="text" name="username" value={userData.username} onChange={handleInputChange}/>
            {errors.username && <p style={{color:'red'}}>{errors.username}</p>}

            <label htmlFor="password">Password: </label>
            <input type="password" name="password" value={userData.password} onChange={handleInputChange}/>
            {errors.password && <p style={{color:'red'}}>{errors.password}</p>}

            <button>LOGIN</button>
        </form> 
    )
}

export default Form;