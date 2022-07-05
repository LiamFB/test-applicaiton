import 'dotenv/config'
import express from 'express';
import routes from './routes/routes';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
    console.log(`App is running on port: ${PORT}`);
    routes(app);
});