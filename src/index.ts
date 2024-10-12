import { name } from "ejs";
import express,{Request, Response} from "express";
import path from "path";

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "/views"));
app.set('img', path.join(__dirname, "/img"));

app.get('/', function (request:Request, response: Response) {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            response.render("index", data);
            
        });
});


app.get('/pokemon/:name', function (request:Request, response: Response) {
    const nomePoke = request.params.name;
    fetch(`https://pokeapi.co/api/v2/pokemon/${nomePoke}`)
        .then(function(res){
            return res.json();
        })
        .then(function(data) {
            response.render("pokemon", { pokemon: data});
        });
});

app.get('/img', function (request:Request, response: Response) {
            response.render("img");
});


app.listen(3000, function () {
    console.log("Server is running in port 3000");
})