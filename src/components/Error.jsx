import { Link } from 'react-router-dom';
import React from 'react';
import style from './Error.module.css';

const Error = () => {
    return(
        <div className={style.error}>
            <h1 className={style.errMje} >Error 404</h1>
            <h2 className={style.notFound} >Page not found</h2>
            <p/>
            <button className={style.button}>
                <Link to='/home' className={style.link}>Go Back Home</Link>
            </button>
        </div>
    )
}

export default Error;