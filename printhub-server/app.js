const express = require('express');
const path = require('path');
const app = express();
const authRoutes = require('./routes/authRoutes');
const catalogRoutes = require('./routes/catalogRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const articleRoutes = require('./routes/articleRoutes');
const addressRoutes = require('./routes/addressRoutes');
const { sequelize } = require('./models'); 
const helmet = require('helmet');
const cors = require('cors');

const allowedOrigin = 'http://localhost:3000';
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet()); 
app.use(cors({
    origin: allowedOrigin, 
}));


app.use('/api/auth', authRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/article', articleRoutes);
app.use('/api/address', addressRoutes);

sequelize.sync()
    .then(() => {
        console.log('Database synchronized');
    })
    .catch((err) => {
        console.error('Database synchronization error:', err);
    });

app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
