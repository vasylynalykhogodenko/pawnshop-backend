const express = require('express');
const cors = require('cors');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const specs = require('./config/swagger');
const authConfig = require('./config/auth');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const itemCategoryRoutes = require('./routes/itemCategoryRoutes');
const pawnTransactionRoutes = require('./routes/pawnTransactionRoutes');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use(passport.initialize());
authConfig(passport);

app.use('/api/auth', authRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/itemCategory', itemCategoryRoutes);
app.use('/api/pawnTransaction', pawnTransactionRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

module.exports = app;