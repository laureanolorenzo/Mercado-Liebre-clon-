const express = require('express');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 3000;

let app = express();

app.use(express.static(path.resolve(__dirname,'public')));

app.listen(port, () => console.log(`Server running on port ${port}`));
// Para no tener que poner tantos app.get(), leo los archivos de la carpeta "views" 
// y los paso uno x uno al app.get() con un for loop
const htmlFiles = fs.readdirSync(path.resolve(__dirname,'views')); 
let htmlNames = [];
for (const file of htmlFiles) {htmlNames.push(file.split('.')[0])}; //Solo el nombre, no la extension 
for (const name of htmlNames) {
    let ruta;
    if (name === 'home'){ //Unico diferente
        ruta = '/';
    } else {
        ruta = `/${name}`;
    }
    app.get(ruta, (req,res) => res.sendFile(path.resolve(__dirname,`views/${name}.html`)));
}




// Post del login
let loginPath = path.resolve(__dirname,'views/home.html');
app.post('/login', (req,res) => {res.sendFile(loginPath)});

// Post del searchbar
let searchPath = loginPath;
app.post('/home', (req,res) => {res.sendFile(searchPath)});