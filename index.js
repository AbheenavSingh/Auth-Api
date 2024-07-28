require('dotenv').config(); 
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./utils/errorHandler');
const rateLimit = require('express-rate-limit');



const app = express();
connectDB();


app.use(express.json({extended:false}));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Apply rate limiting to all requests
app.use('/api/', apiLimiter);




app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


