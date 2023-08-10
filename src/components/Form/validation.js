const validation = (userData) => {
    let errors = {};

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.username)){
        errors.username = 'El nombre de usuario debe ser un email o el usuario ingresado es inválido';
    }
    if(!userData.username){
        errors.username = 'Debe ingresar un nombre de usuario';
    }
    if(userData.username.length > 35){
        errors.username = 'El nombre de usuario debe tener menos de 35 caracteres';
    }
    if(!userData.password.match(/\d/)){
        errors.password= 'La contraseña debe contener al menos un número';
    }
    if(userData.password.length < 6 || userData.password.length > 10){
        errors.password= 'La contraseña debe tener entre 6 y 10 caracteres';
    }
    return errors;
}

export default validation;