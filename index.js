const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Servir les fichiers statiques
app.use(express.static('public'));

// Endpoint pour récupérer les informations d'un Pokémon
app.get('/api/pokemon/:name', async (req, res) => {
    const pokemonName = req.params.name.toLowerCase();
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: "Pokémon non trouvé" });
    }
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
