import express from 'express';
import data from './data';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
import uploadRoute from './routes/uploadRoute';

dotenv.config();
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(err => console.log(err.reason));


const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/uploads', uploadRoute);
app.use('/api/orders', orderRoute);
app.use(express.static(__dirname + '/public'));
app.get('/api/config/paypal', (req, res)=>{
    res.send(config.PAYPAL_CLIENT_ID);
});
app.get('/api/products', (req, res) => {
    res.send(data.products);
});
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x => x._id === productId);
    if (product){
        res.send(product);
    } else {
        res.status(404).send({msg: "Product Not Found."});
    }

});





app.listen('4000' , () => {
    console.log('Server started on port 4000');
});


// "proxy": "http://127.0.0.1:4000",

