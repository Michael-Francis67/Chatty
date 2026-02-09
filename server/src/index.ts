import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {Server} from "socket.io";
import {createServer} from "http";

// local imports
import app from "@/app";

// routes imports
import authRoutes from "@/routes/auth.route";
import { ENV } from "./configurations/env";

// middlewares
app.use(helmet())
app.use(
    cors({
        origin: ENV.CLIENT_URL,
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
        origin: ENV.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    },
});

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
});

const PORT = ENV.PORT;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

