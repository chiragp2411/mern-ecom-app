import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazona', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);


app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

// default route
app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
