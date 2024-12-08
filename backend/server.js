const express = require('express');
const methodOverride = require('method-override');
const mongoConfig = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 3000 
const app = express();
const notesRouter = require('./Routes/NotesRoutes')

require('dotenv').config()

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://jaylenberrien.github.io',
        'https://jaylenberrien.github.io/notes',
        'notes-production-9ca7.up.railway.app'

    ],
    methods: 'GET, HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
}));


app.use(bodyParser.json());

app.use((req, res, next) =>{
    console.log(req.path, req.method, req.body)
    next()
})


app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))


app.use('/notes', notesRouter);

app.get('/', async (req, res)=>{
    res.send(`${req.body}`)
})
  

app.listen(PORT, () =>{  
    console.log("listening on port " + PORT)  
    mongoConfig()
})