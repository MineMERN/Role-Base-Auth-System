import { app } from "./app";
import { env } from "./utils/env";
import { ConnectDB } from "./configs/db";

ConnectDB.then(() => {
    if (!ConnectDB){
        return console.log("DB didn't connected successfully(retry/logging)")
    }
    console.log("MongoDB connected successfully");
    app.listen(env.PORT, () => {
        console.log(`App listen on http://localhost:${env.PORT}`)
    })
})