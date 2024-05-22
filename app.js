const express = require('express');
const app = express();
const userRouter = require('./routes/user');

app.use(express.json());

// Routes
app.use('/register', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error'
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
