import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import security from "../utils/security.png";
import Image from "next/image";
import Navbar from "../components/LandingNav";
import { setUserCookie } from "../auth/userCookie";
import { mapUserData } from "../auth/useUser";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import "firebaseui/dist/firebaseui.css";

import "firebase/compat/firestore";
import "firebase/compat/database";

const config = {
	apiKey: "AIzaSyCcJCe1acm01EIceSP_xlZv5OUZd-BQfRw",
	authDomain: "stack-smashers.firebaseapp.com",
	databaseURL: "https://stack-smashers-default-rtdb.firebaseio.com",
	projectId: "stack-smashers",
	storageBucket: "stack-smashers.appspot.com",
	messagingSenderId: "740939279438",
	appId: "1:740939279438:web:abab3ad7c9b9da1efae71f",
	measurementId: "G-02JCX0S0ME",
};

//If an firebase app hasn't already been created
if (!firebase.apps.length) {
	firebase.initializeApp(config);
}

const firebaseAuthConfig = ({ signInSuccessUrl }) => ({
	signInFlow: "popup",
	signInOptions: [
		{
			provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
			requireDisplayName: false,
		},
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
	],
	signInSuccessUrl,
	credentialHelper: "none",
	callbacks: {
		signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
			const userData = await mapUserData(user);
			setUserCookie(userData);
		},
	},
});

const FirebaseAuth = () => {
	const signInSuccessUrl = "/home";
	return (
		<div className={styles.container}>
			<Head>
				<title>AdminX</title>
				<meta name="description" content="#1B203E" />
				<Navbar />
			</Head>
			<main className={styles.main}>
				<Image
					src={security}
					alt="Picture of the author"
					width={300}
					height={300}
				/>
			</main>

			<StyledFirebaseAuth
				uiConfig={firebaseAuthConfig({ signInSuccessUrl })}
				firebaseAuth={firebase.auth()}
				signInSuccessUrl={signInSuccessUrl}
			/>
		</div>
	);
};

export default FirebaseAuth;
