import { firestore } from "./firebase";

const getUsers = async () => {
    // const all_users=[];
    const snapshot = await firestore.collection("Users").get();
    const all_users = snapshot.docs.map((doc) => (doc.data()));

    return all_users;
};

export { getUsers };