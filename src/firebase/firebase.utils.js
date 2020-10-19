import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
const config = {
  apiKey: "AIzaSyCfCg6zJ9OnbPDxJi1VQPbX6enEl7OUHQ4",
  authDomain: "todoist-17cef.firebaseapp.com",
  databaseURL: "https://todoist-17cef.firebaseio.com",
  projectId: "todoist-17cef",
  storageBucket: "todoist-17cef.appspot.com",
  messagingSenderId: "494862876954",
  appId: "1:494862876954:web:474d3b458273f962da2ca3",
  measurementId: "G-XPBEPJV4VH",
};

export const saveUser = async (createdUser) => {
  const userRef = firestore.doc(`users/${createdUser.user.uid}`);
  const createdAt = new Date();
  await userRef.set({
    uid: createdUser.user.uid,
    email: createdUser.user.email,
    displayName: createdUser.user.displayName,
    avatar: createdUser.user.photoURL,
    createdAt,
  });
  return userRef;
};

export const firebaseAddToDo = async ({
  addtask,
  uid,
  createdAt,
  addproject,
}) => {
  const todoRef = firestore.collection(`Todo`);
  const completed = false;
  await todoRef.add({ addtask, uid, createdAt, addproject, completed });
};

export const completedTodo = (id) => {
  const todoRef = firestore.collection("Todo").doc(id);
  todoRef.onSnapshot((snapShot) => {
    const completed = true;
    todoRef.set({ ...snapShot.data(), completed });
  });

  return todoRef;
};

//.then(() => {
// console.log(" successfully Completed!");
//})
//.catch((error) => {
// console.error("Error: ", error);
//});
export const deleteTodo = (id) => {
  const todoRef = firestore.collection("Todo").doc(id).delete();

  return todoRef;
  //return firestore.collection("Todo").doc(id).delete();
};

export const convertTodoSnapShotToDateMap = (collections) => {
  const transformedCollection = collections
    .slice()
    .sort((a, b) => a.createdAt - b.createdAt);

  return transformedCollection;
};

export const firebaseAddProject = async ({ addproject, uid, createdAt }) => {
  const contactRef = firestore.collection(`Project`);
  contactRef.add({ addproject, uid, createdAt });
  return contactRef;
};

export const deleteProject = (id) => {
  const todoRef = firestore.collection("Project").doc(id).delete();

  return todoRef;
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
export default firebase;
