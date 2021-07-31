// import dependencies
import express from "express"
import mongoose from "mongoose"
import Pusher from "pusher"
import cors from "cors"
import mongoMessages from "./messageModel.js"

// app config
const app = express()
const port = process.env.PORT || 9000

const pusher = new Pusher({
    appId: "1243261",
    key: "66b1dce23ff140b0faea",
    secret: "0f6f6513c24816145ada",
    cluster: "eu",
    useTLS: true
  });

// middlewares
app.use(express.json());
app.use(cors());

// db config
const mongoURI = "mongodb+srv://admin:Aqfw8cHL2IiQ3Svv@cluster0.ci8dv.mongodb.net/messengerDB?retryWrites=true&w=majority"
mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.once("open", () => {
    console.log("db connected")

    const changeStream = mongoose.connection.collection("messages").watch()
    changeStream.on("change", (change) => {
        pusher.trigger("messages", "newMessage", {
            "change": change
        })
    })
})

// api routes
app.get("/", (req, res) => res.status(200).send("hello world"))

app.post("/save/message", (req, res) => {
    const dbMessage = req.body

    mongoMessages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get("/retrieve/conversation", (req, res) => {
    mongoMessages.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            data.sort((b, a) => {
                return a.timestamp - b.timestamp;
            })
            res.status(200).send(data)
        }
    })
})

// listen
app.listen(port, () => console.log(`listening on localhost:${port}`))