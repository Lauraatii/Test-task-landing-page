const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// EJS for server-side rendering
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    const { breakLevel = 'Break 80' } = req.query; // Default to "Break 80"
    res.render('index', { breakLevel });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Landing Page running on http://localhost:${PORT}`));
