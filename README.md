# React Redux Firebase Boilerplate

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Introduction

A Boilerplate to quickly start your application with React/Redux and Firebase, from the basic connections/CRUD and authentification you only need to add your designs and code, this way you will speed up your developpement process

# [Demo](https://github-react-rrdux.firebaseapp.com/signin)

## Quick Start

```shell
$ git clone https://github.com/abszar/React-Redux-Firebase-Boilerplate.git
$ cd React-Redux-Firebase-Boilerplate
$ npm install
$ npm run dev
```

## Firebase settings

First you need to create your firebase application to fetch settings for boilerplate. For more information how to add your web app check this [resource](https://firebase.google.com/docs/web/setup). After it copy your settings from firebase and fill config/firebaseConfig.js

```javascript
// Initialize Firebase
var config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
firebase.initializeApp(config);
```

## Features

- [react](https://github.com/facebook/react)
- [redux](https://github.com/rackt/redux)
- [firebase](https://www.npmjs.com/package/firebase)
- [react-router](https://github.com/rackt/react-router)
- [react-redux-firebase](https://github.com/prescottprue/react-redux-firebase)
- [redux-firestore](https://github.com/prescottprue/redux-firestore)
- [redux-thunk](https://github.com/reduxjs/redux-thunk)
