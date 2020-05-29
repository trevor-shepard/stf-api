export const verifyToken = (admin, token) => {
    try {
        const decodedToken = admin.auth().verifyIdToken(token)
        const uid = decodedToken.uid;
        return uid
    } catch(error) {
        console.log("verify token error", error)
        throw error
    } 
    
}