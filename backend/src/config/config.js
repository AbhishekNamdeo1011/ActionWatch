import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is not defined in environment variables");
}
if (!process.env.JWT_SECRET) {
  console.error("JWT_SECRET is not defined in environment variables");
}
const config = {

  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  PINECONE_API_KEY: process.env.PINECONE_API_KEY,
  PINECONE_INDEX: process.env.PINECONE_INDEX,
  PINECONE_HOST: process.env.PINECONE_HOST,
  PINECONE_NAMESPACE: process.env.PINECONE_NAMESPACE,
  EMAIL_USER: process.env.EMAIL_USER,

GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
 
GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
}

export default config;  