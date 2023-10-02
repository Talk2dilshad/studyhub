const express = require("express");
const cors = require("cors");
const app = express();


  const corsOptions = {
    origin: ['https://studyhub-six.vercel.app/','http://localhost:3000'],
    credentials: true,
  };

  app.use(cors(corsOptions));


  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  



const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

const database = require("./config/database");
const cookieParser = require("cookie-parser");

const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");


dotenv.config();
const PORT = process.env.PORT ||5000;

//database connect
database.dbConnect();

//middleware
app.use(express.json());
app.use(cookieParser());



app.use(
    fileUpload({useTempFiles:true,tempFileDir:"/tmp"})
)

//cloudinary connect
cloudinaryConnect();


//define routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/course",courseRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use('/api/v1/reach',contactUsRoute);


// default route
app.get("/",(req,res) => {
    return res.json({
        success:true,
        message:`Server is running at Port ${PORT}`
    })
});

app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
});
