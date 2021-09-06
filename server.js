const express = require('express'); 
const path = require('path'); 
const app = express(); 
app.use(express.static(path.join(__dirname, 'build'))); 
app.get('/*', function (req, res) { 
    res.header('Access-Control-Allow-Origin', '*'); 
    

    
    res.sendFile(path.join(__dirname, 'build', 'index.html')); 

});//TODO: Error Handling:
// start the server in the port 9000 !
app.listen(9000, function () { console.log('Web app listening on port 9000.');});