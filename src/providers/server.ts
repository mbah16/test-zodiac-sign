import http from "http";
import { app } from "./app";

const server = http.createServer(app);
const port = Number(process.env.PORT || 2000);
const environment: string = process.env.NODE_ENV;

const onListening = (): void => {
    const addr = server.address();
    const addrIsStr = typeof addr === "string";
    const bind = addrIsStr ? `pipe ${addr}` : `port ${addr.port}`;
    console.debug(`[Server] is running on ${bind} with ${environment}`);
    console.info("Press CTRL-C to stop\n");
};

const onError = (error: NodeJS.ErrnoException): void => {
    if (error.syscall !== "listen") throw error;
    const bind = `Port ${port}`;

    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            break;
        default:
            throw error;
    }
};

export const createServer = {
    start(portServer: number = port) {
        server.listen(portServer);

        server.on("error", onError);
        server.on("listening", onListening);
    },
    close() {
        return new Promise((resolve) => {
            server.close(() => {
                resolve(0);
                console.info("[server] closed");
            });
        });
    },
};
