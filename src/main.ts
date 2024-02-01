import { createServer } from "./providers";

createServer.start();

process.on("uncaughtException", async (error: any) => {
    console.error(error);
    await createServer.close();
});

process.on("unhandledRejection", async (error: any) => {
    console.error(error);
    await createServer.close();
});

process.on("SIGTERM", async () => {
    console.info("Gracefully shutting down");
    await createServer.close();
    process.exit(0);
});
