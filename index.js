const express = require('express');
const port = 8000;
const app = express();
app.listen(port,function(err){
    if(err){
        console.log(`error in port: ${port}`); 
    }
    console.log(`server is running on port: ${port}`);
});