import style from './About.module.css';

const About = () => {
    return(
        <div className={style.container}>
            <h1>Rick and Morty App</h1>
            <div>            
                <a rel="noreferrer" href='https://www.linkedin.com/in/diegocusmai' target='_blank' className={style.name}>
                    By Diego Cusmai Dev
                </a>              
            </div>
            <h3>Esta App fue desarrollada con fines académicos durante el cursado del bootcamp Fullstack Developer en Henry. Para su desarrollo, se utilizó un stack de tecnología PERN.<p/><br/>Contacto Developer: diegocusmai@yahoo.com.ar o por tel: +54-9-261-5861238</h3>
            <div className={style.front}>
                <img src="./DiegoDev.png" alt="Foto Diego Dev" width={200} className={style.image}/>
            </div>
        </div>
    )
}

export default About;