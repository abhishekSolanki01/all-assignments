const express = require('express');
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const model = mongoose.model;
const Joi = require("joi");
const cors = require("cors")
const CONNECTION_STRING = `mongodb+srv://abhishek:12345@cluster0.pcghker.mongodb.net/?retryWrites=true&w=majority`
const SECRET = "secret"

app.use(cors())
app.use(express.json());

//let ADMINS = [];
const adminSchema = new Schema({
  username: String,
  password: String
})

// let USERS = [];
const userSchema = new Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: Schema.Types.ObjectId, ref: 'course' , unique: true}]
})
// let COURSES = [];
const courseSchema = new Schema({
  title : String, 
  description: String, 
  price: Number, 
  imageLink: String, 
  published: Boolean
})

//models
const Admin = model('admin', adminSchema)
const User = model('user', userSchema)
const Course = model('course', courseSchema)

//db connection 
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

//middleware 
//auth 
const auth = async (req, res, next) => {
  try{
    const authorization = req.headers.authorization;
  if(!authorization){
    console.log("Unauth");
    return res.status(403).send({message: "Unauthorised"})
  }
  const token = authorization.split(" ")[1];
  const decodeToken = await jwt.verify(token, SECRET);
  const adminUser = await Admin.exists({username: decodeToken.username})
  if(adminUser){
    req.user = decodeToken
    next();
  }else{
    return res.status(401).send({message: "Unauthorised"});
  }

  }catch(err){
    return res.status(401).send({message: "Unauthorised"});
  }
}

const userAuth = async (req, res, next) => {
  try{
    const authorization = req.headers.authorization;
    if(!authorization){
      return res.status(403)
    }
    const token = authorization.split(" ")[1];
    const decodeToken = await jwt.verify(token, SECRET);
    let user;
    if(decodeToken){
       user = await User.exists({username: decodeToken.username})
    }
    if(user){
      req.user = decodeToken
      next();
    }else{
      return res.status(403).json({ message: 'User not found' });
    }
  }catch(e){
    console.log("--------------->", e);
    return res.status(403).json({ message: 'User not found' });
  }
}

const courseValidation = (req, res, next) => {
  const { title, description, price, imageLink, published } = req.body;
  const schema = Joi.object({
    title : Joi.string().max(100).required(), 
    description: Joi.string().max(100), 
    price: Joi.number().required(), 
    imageLink: Joi.string(), 
    published: Joi.boolean()
  })
  const {value, error} = schema.validate(req.body);
  if(error){
    return res.status(403).send({error})
  }
  next()
}

// Admin routes
app.post('/admin/signup', async (req, res) => {
  const { username, password } = req.body;

  const alreadyAnAdmin = await Admin.exists({username});
  if(alreadyAnAdmin){
    res.status(403).send({message: 'Admin already exists'})
  }else{
    const obj = { username, password };
    const adminToBeAdd = new Admin(obj)
    const saveAdmin = await adminToBeAdd.save();
    const token = jwt.sign({username, role: 'admin'}, SECRET, { expiresIn: '100h' })
    res.json({ message: 'Admin created successfully', token });
  }
});

app.post('/admin/login', async(req, res) => {
  const {username, password} = req.headers;
  const ifAdminExist = await Admin.exists({ username, password });
  if(ifAdminExist){
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '100h' });
    res.json({ message: 'Logged in successfully', token });
  }else{
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.post('/admin/courses', auth, courseValidation ,async(req, res) => {
  const { title, description, price, imageLink, published } = req.body;
  const obj = {title, description, price, imageLink, published };
  const courseDB = new Course(obj);
  await courseDB.save()
  res.json({ message: 'Course created successfully', courseId: courseDB.id });

});

app.get('/admin/courses/:courseId', auth, async (req, res) => {
  const { courseId } = req.params;
  const courseById = await Course.findById(courseId)

  if(courseById){
    res.json(courseById);
  }else{
    res.status(404).json({ message: 'Course not found' });
  }

});

app.put('/admin/courses/:courseId', auth, async (req, res) => {
  const { courseId } = req.params;
  const { title, description, price, imageLink, published } = req.body;
  const updateCourseById = await Course.findByIdAndUpdate(courseId, { title, description, price, imageLink, published }, { new: true })

  if(updateCourseById){
    res.json({ message: 'Course updated successfully' });
  }else{
    res.status(404).json({ message: 'Course not found' });
  }

});

app.get('/admin/courses', auth, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

// User routes
app.post('/users/signup', async (req, res) => {
  const { username, password } = req.body;
  const addUser = await User.exists({username})
  if(addUser){
    res.status(403).json({ message: 'User already exists' });
  }else{
    const addNewUser = new User({username, password})
    await addNewUser.save(); 
    const token = await jwt.sign({username, password}, SECRET, {expiresIn: "1h"});
    res.json({ message: 'User created successfully', token });
  }
});

app.post('/users/login', async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.exists({ username, password });
  if(user){
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '100h' });
    res.json({ message: 'Logged in successfully', token });
  }else{
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

app.get('/users/courses', userAuth, async (req, res) => {
  const courses = await Course.find({published: true});
  res.json({ courses });
});

app.get('/users/courses/:courseId', userAuth, async (req, res) => {
  const { courseId } = req.params;
  const courseById = await Course.findById(courseId)

  if(courseById){
    res.json(courseById);
  }else{
    res.status(404).json({ message: 'Course not found' });
  }

});

app.post('/users/courses/:courseId', userAuth, async (req, res) => {
  const {courseId} = req.params;
  const course = await Course.findById(courseId);
  if(course){
    const user = await User.findOne({username: req.user.username});
    user.purchasedCourses.push(course);
    await user.save()
    res.json({ message: 'Course purchased successfully' });
  }else{
    res.status(404).json({ message: 'Course not found' });
  }

});

app.get('/users/purchasedCourses', userAuth, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate('purchasedCourses');
  if(user){
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  }else {
    res.status(403).json({ message: 'User not found' });
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
