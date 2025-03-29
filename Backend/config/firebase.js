const admin = require("firebase-admin");
const serviceAccount = require("../config/serviceAccountKey.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "mern-user-18104.firebasestorage.app", // Replace with your Firebase Storage bucket
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { admin, db, bucket };
