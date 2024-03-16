const app = require('./server');
const { sequelize } = require('../DB_Conection');
const  saveApiData = require('../controllers/saveApiData');


sequelize.sync({ force: true}).then(async () => { // Levanta la base de datos, fuerza que se cierre y actualice con cada cambio y luego conecta el servidor. El then es porque es asíncrona, para que no genere problemas y espere para conectar el server.
    // RECORDAR: Una vez cargada la DB con todos los datos, poner force: false o alter:true, para que no me esté tirando y cargando los datos en la DB constantemente.
    console.log("Base de Datos conectada");
    //console.log(await saveApiData()); //No me funcionó, pero los characters sí están en la DB
    await saveApiData();
    app.listen(3001, () => { // Conecta el servidor
        console.log('Server on port 3001');
    })
}).catch((error) => {
    console.log(error);
})