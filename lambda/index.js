const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

let cachedDb = null;

const connectToDatabase = async () => {
  if (cachedDb) return cachedDb;
  
  const db = await mongoose.connect(process.env.MONGODB_URI);
  cachedDb = db;
  return db;
};

exports.handler = async (event) => {
  try {
    await connectToDatabase();
    
    const { username } = JSON.parse(event.body);
    
    const user = await User.findOne({ username });
    if (!user) {
      return {
        statusCode: 401,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Usuario no encontrado' })
      };
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        user: { id: user._id, username: user.username }
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Error del servidor' })
    };
  }
};