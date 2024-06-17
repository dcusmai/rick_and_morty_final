import style from './About.module.css';

const About = () => {
    return(
        <div className={style.container}>
            <h1 className={style.rymtitle}>Rick and Morty App</h1>
            <div>            
                <a rel="noreferrer" href='https://www.linkedin.com/in/diegocusmai' target='_blank' className={style.name}>
                    By Diego Cusmai
                </a>
                <p className={style.subname}>
                    Fullstack Dev
                </p>
                <p className={style.clic}>👆 Hacé clic en mi nombre para ver mi LinkedIn</p>              
            </div>
            <h3 className={style.about}>Esta App fue desarrollada con fines académicos durante el cursado del bootcamp Fullstack Developer en Henry. Para su desarrollo, se utilizó un stack de tecnología PERN (Postgres, Express, React y Node basados en Javascript).<br/>La aplicación permite loguear usuario, buscar personajes por ID, elegir favoritos y guardarlos en una DB relacional, ordenarlos, filtrarlos y eliminarlos. Posee esta página About y permite cerrar cesión. Además es 100% responsive.<br/> <p/><br/>Contacto Developer: diegocusmai@yahoo.com.ar o por tel: +54-9-261-5861238</h3>
            <div className={style.front}>
                <img src="./DiegoDev_Fondo_RyM.png" alt="Foto Diego Dev" width={200} className={style.image}/>
            </div>
        </div>
    )
}

export default About;