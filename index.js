import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config({ path: './BackEnd/config/.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Le script démarre !");

const app = express();
const PORT = process.env.PORT || 3000;

// Servir les fichiers statiques depuis le dossier FrontEnd
app.use(express.static(path.join(__dirname, 'FrontEnd', )));

// Renvoyer explicitement la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'FrontEnd', 'DossierHtml', 'MonSiteAccueil.html'));
});

// Pages de connexion / inscription (routes propres)
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'FrontEnd', 'DossierHtml', 'Login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'FrontEnd', 'DossierHtml', 'Signup.html'));
});

// Support des anciens liens qui pointent vers Login.html / Signup.html
app.get('/Login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'FrontEnd', 'DossierHtml', 'Login.html'));
});

app.get('/Signup.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'FrontEnd', 'DossierHtml', 'Signup.html'));
});



app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
