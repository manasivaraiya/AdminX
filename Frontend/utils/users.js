import {firestore} from "./firebase";

const getUsers = async() => {
    const snapshot = await firestore.collection("Users").get();
    snapshot.docs.forEach((doc) => console.log(doc.data()));
};

export { getUsers };