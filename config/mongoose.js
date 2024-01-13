const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial');
const db = mongoose.connection;
db.on('error',console.error.bind("error is coming"));
db.once('open',function(){
    console.log("connected successfully:mongodb");
});
module.exports=db;