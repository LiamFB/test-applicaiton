import { Notification } from "../model/notifications";
import data from "./notification.json";

export default async function dbConnection(): Promise<Notification[]> {
    // Here I would normally have some process of data url passed in as enviroment variable.
    // console.log(process.env.DATABASE_URI)
    // if (typeof process.env.DATABASE_URI !== "string") {
    //     throw new Error("Database URI not provided in correct format");
    // }
    return Promise.resolve(data);
}