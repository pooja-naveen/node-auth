import mongo from "mongodb";
const { MongoClient } = mongo;
const url = process.env.MONGO_URL;

export const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export async function connectDb() {
  try {
    await client.connect();
    console.log("connected to DB");
  } catch (e) {
    console.error(e);
    await client.close();
  }
}
