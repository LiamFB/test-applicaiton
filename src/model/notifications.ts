import { Post } from "./post";
import { User } from "./user";
import { Comment } from "./comment";

export interface Notification {
    type: string,
    read: boolean,
    post: Post,
    user: User,
    comment?: Comment
}




