require("firebase/firestore");
require("dotenv").config();

const express = require("express");
const firebase = require("firebase");

const app = express();

app.listen(process.env.PORT || 3000);

firebase.initializeApp({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID
});

const db = firebase.firestore();

db.collection(process.env.FIREBASE_COLLECTION_LOCATIONS)
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(doc => {
      console.log(doc.data());
    });
  });
