
// Importing Express and other apps:
import dotenv from 'dotenv';
dotenv.config();
import express from "express"
import bcrypt from "bcryptjs";
import cors from 'cors';
import knex from 'knex';
import fetch from 'node-fetch';
import pg from 'pg';
import * as signin from './controllers/signin.js';
import * as register from './controllers/register.js';
import * as profile from './controllers/profile.js';
import * as image from './controllers/image.js';
import * as clarifai from './controllers/clarifai.js';
import knexConfig from './knexfile.js';

import fs from 'fs';
import path from 'path';

const SECRET_KEY = "sast_thisIsHardcodedSecret";

//Initialize an Express application:
const app = express();


// Or, to restrict it to your Netlify domain:
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || '*';

app.use(cors({
  origin: '*',
  credentials: true
}));


//Defining a Port: Setting a port number for the server to listen on.

const PORT = process.env.PORT || 3000;

// //Adding the cors middleware to be used before the routes. This enables cross origin resource sharing by default.
// app.use(cors());


// endpoint to leak secrets (for demo/testing SAST)
app.get('/api/vuln-secret', (req, res) => {
  res.json({ secret: SECRET_KEY });  // BAD: Leaks secret key
});


  app.get('/api/test', (req, res) => {
    res.json({ message: "CORS is working!" });
  });


// 3️⃣ Database connection (Railway DATABASE_URL)
const db = knex(knexConfig.development);



// Built-in middleware to parse JSON data on recieving the HTTP POST body requests
app.use(express.json());

// Built-in middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => { res.send("Server is live!");});


app.post('/api/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt);});

// dependency injection implmentation to execute the controllers properly.

app.post('/api/register', (req,res) => {
  console.log("✅ register route HIT");
  register.handleRegister(req,res,db,bcrypt);});


app.get('/api/profile/:id',(req,res) => {profile.handleProfile(req,res,db) ;});

app.put("/api/image", (req,res) => {image.handleImage(req,res,db);} );


app.post('/api/clarifai', (req,res) => {clarifai.handleClarifai(req,res,fetch)});

app.get('/api/vuln-sql', async (req, res) => {
  const { username } = req.query;
  const rawQuery = `SELECT * FROM users WHERE username = '${username}'`;
  const result = await db.raw(rawQuery);
  res.json(result.rows || result);
});

app.get('/api/readfile', (req, res) => {
  const filename = req.query.filename;
  const filePath = path.join(process.cwd(), filename);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(404).send('File not found');
    res.send(data);
  });
});

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
  });

