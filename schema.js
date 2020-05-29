import { Timestamp } from "@google-cloud/firestore";

const Schema = {
    users: {
        email: String,
        username: String,
        id: String,
        groups: {id}
    },
    season: {
        name: string,
        phase: Number,
        id: string,
        users: {id},
        activites : {
            ["name-of-activities"]: {
                userID: [points]
            }
        }
    },
    
    "activity-event": {
        id: string,
        user: id,
        season: id,
        action: string,
        date: Timestamp
    }
}