import express from "express"
import { connectDB } from "./config/db.js";
import path from "path";
import customerRoutes from "./routes/customerRoutes.js"

const app = express();
const Port = 4000;


connectDB()
app.use(express.json())

app.use(express.urlencoded({ extended: true }));


app.get("/new",(req,res)=>{
    res.redirect("/customer/new")
})


//routes:-

app.use("/customer",customerRoutes)

//ejs setup:-
app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

// app.get("/",(req,res)=>{
//     res.send("Api Working Successfully")
// })

app.get("/",(req,res)=>{
    res.render("home")
})




//staticfiles:-
app.use(express.static(path.resolve("public")))

app.listen(Port, ()=>{
    console.log(`server started on ${Port}`);
    
})