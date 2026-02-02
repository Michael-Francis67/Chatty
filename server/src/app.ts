import express from "express";

const app = express();

app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({extended: true}));

export default app;
