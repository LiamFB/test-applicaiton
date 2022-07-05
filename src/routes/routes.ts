import { Express } from 'express';
import { body, CustomValidator } from 'express-validator';
import {
    addNotifications,
    getAllNotifications,
    markAsRead
} from "../handlers/notifications.handler";
export default function routes(app: Express) {
    // Register user
    // app.post('/api/users', validateResource(createUserSchema), createUserHandler);

    // - The first endpoint will provide the functionality to retrieve an aggregated list of notifications for a 
    // given post. We are looking for a response that is as close to production ready as possible.
    app.get("/notifications/:id", getAllNotifications);
    // - The second endpoint will expose a POST method that will add an element to this feed of 
    // notifications.
    app.post(
        "/notifications",
        body('type').isString(),
        body('read').isBoolean(),
        body('post.id').isString(),
        body('post.title').isString(),
        body('comment').custom(validateComment()),
        addNotifications
    );
    // - The third and last endpoint should expose the functionality to mark these feeds as read.
    app.patch("/notifications/:id", markAsRead);

    function validateComment(): CustomValidator {
        return (value, { req }) => {
            const isComment = req.body.type === "Comment";
            if (!isComment && value === undefined) {
                return true;
            }
            if (isComment && value === undefined) {
                throw new Error('no comment included in Comment notificaton');
            }
            if (!isComment && value !== undefined) {
                throw new Error('comment text included, but notificaiton is not a comment');
            }
            if ((typeof value.id !== "string") && (typeof value.commentText !== "string")) {
                throw new Error('comment should have id and comment text');
            }
            return true;
        };
    }
}

