import { Request, Response } from 'express'
import { validationResult } from 'express-validator';
import NotificationAdapter from '../adapter/notification-steam.service';
import { Notification } from "../model/notifications";

export async function getAllNotifications(req: Request, res: Response) {
    try {
        const notifications = await NotificationAdapter.getNotifications(req.params.id);
        res.json(notifications);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export async function addNotifications(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newNotification: Notification = {
            type: req.body.type,
            post: { id: req.body.post.id, title: req.body.post.title },
            read: req.body.read,
            user: { id: req.body.user.id, name: req.body.user.id },
        }
        console.log(newNotification);
        const result = await NotificationAdapter.create(newNotification);
        res.status(201).json({ message: result });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}

export async function markAsRead(req: Request, res: Response) {
    try {
        const notifications = await NotificationAdapter.markAsRead(req.params.id);
        res.json(notifications);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
}
