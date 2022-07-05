import { Notification } from "../model/notifications";
import dbConnection from "./connection";
export default class NotificationAdapter {
    // The first endpoint will provide the functionality to retrieve an aggregated list of notifications for a 
    // given post. We are looking for a response that is as close to production ready as possible.
    static async getNotifications(notificationID: string): Promise<Notification[]> {
        const data: Notification[] = await dbConnection();
        console.log(data[0]);
        return data.filter((notific: Notification) => notific.post.id === notificationID);
    }
    static async create(newNot: Notification): Promise<string> {
        const data = await dbConnection();
        data.push(newNot);
        return newNot.post.id;
    }
    static async markAsRead(notificationID: string): Promise<void> {
        const data = await dbConnection();
        data.forEach((notific: Notification) => {
            if (notific.post.id === notificationID) {
                notific.read = true;
            }
        })
    }
}

