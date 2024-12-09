const express = require('express');
const statsRoutes = require('./routes/stats');

const app = express();

app.use('/', statsRoutes);

app.use((req, res, next) => {
    res.status(404).json({ error: "Not Found" });
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({ error: err.message})
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

module.exports = app; 