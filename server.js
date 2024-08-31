
import { app } from './app.js';
import { connectDB } from './data/dbConnection.js';

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`server started ${process.env.PORT}`);
});