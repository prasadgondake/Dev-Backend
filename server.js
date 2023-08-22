const { request } = require('express');
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//Connect Database
connectDB();

app.use(express.json({ extended : false }));


app.use('https://main--inspiring-melomakarona-2f0a2a.netlify.app/api/users' , require('./routes/api/users'));
app.use('https://main--inspiring-melomakarona-2f0a2a.netlify.app/api/auth' , require('./routes/api/auth'));
app.use('https://main--inspiring-melomakarona-2f0a2a.netlify.app/api/profile' , require('./routes/api/profile'));
app.use('https://main--inspiring-melomakarona-2f0a2a.netlify.app/api/posts' , require('./routes/api/posts'));

// Serve static assets in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*',(req, res)=> {
        res.sendFile(path.resolve(__dirname , 'client' , 'build' , 'index.html'));
        // res.send("Hello");
    });
}
// app.get('/',(req, res)=> {
//     res.send("Hello");
// });

const PORT=process.env.PORT || 5000;


app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
