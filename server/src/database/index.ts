import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

const { MONGO_USER, MONGO_USER_PASSWORD, MONGO_CLUSTER } = process.env;
const url = `mongodb+srv://${MONGO_USER}:${MONGO_USER_PASSWORD}@${MONGO_CLUSTER}.yxrfk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url);

  const db = client.db("main");

  return {
    listings: db.collection("test_listings"),
  };
};
