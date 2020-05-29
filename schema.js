import { Timestamp } from "@google-cloud/firestore";

const Schema = {
    users: {
        email: String,
        username: String,
        id: String,
        groups: {id}
    },
    groups: {
        name: string,
        status: Number,
        id: string,
        users: [id],
        values: {
            action: points
        },
        votes: {
            action: {
                userID: points
            }
        }
    },
    activity: {
        id: string,
        user: id,
        group: id,
        action: string,
        date: Timestamp
    }
}