const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const { sequelize } = require('./models'); 
const helmet = require('helmet');
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
// For parsing JSON data:
app.use(express.json());
app.use(helmet()); 
app.use(cors()); 

app.use('/api/auth', authRoutes);

sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((err) => {
        console.error('Database synchronization error:', err);
    });

app.use(express.static('public'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
