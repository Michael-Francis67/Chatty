import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {Server} from "socket.io";
import {createServer} from "http";

// local imports
import app from "@/app";
import connectDB from "@/configurations/database";

// routes imports
import authRoutes from "@/routes/auth.route";

// configure environment variables
dotenv.config({path: "./.env.local"});

// middlewares
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
);
app.use(morgan("common"));
app.use(cookieParser());
app.use(bodyParser.json({limit: "10mb"}));
app.use(bodyParser.urlencoded({extended: true}));

// routes
app.use("/api/auth", authRoutes);

// create http server
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    },
});

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
});

const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGO_URI as string)
.then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error("Failed to start server:", error);
});
