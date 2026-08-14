import dotenv from "dotenv";
import { Client, Storage } from "node-appwrite";

dotenv.config();

const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

export const storage = new Storage(client);

export const bucketId = process.env.APPWRITE_BUCKET_ID;