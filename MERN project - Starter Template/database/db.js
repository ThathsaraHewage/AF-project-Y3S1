const mongoose = require('mongoose');

const connection = async()=> {
    try{
        await mongoose.connect('mongodb://localhost:27017/ICAF', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
         });

         console.log('Database connection SUCCESS');
    }catch(err){
        console.log(err);
    }

}

module.exports = connection;