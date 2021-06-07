import "./env.js";

import { fastify } from "fastify";
import fastifyStatic from "fastify-static";
import path from "path";
import { fileURLToPath } from "url";

import { connectDb } from "./db.js";
import { request } from "http";

import { registerUser } from "./accounts/register.js";

//esm specific features
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = fastify();
console.log(process.env.MONGO_URL);

async function startApp() {
  try {
    app.register(fastifyStatic, {
      root: path.join(__dirname, "public"),
    });

    app.post("/api/register", {}, async (request, reply) => {
      try {
        const userId = await registerUser(
          request.body.email,
          request.body.password
        );
      } catch (error) {
        console.error(error);
      }
    });

    // app.get("/", {}, (request, reply) => {
    //   reply.send({
    //     data: "hello world",
    //   });
    // });

    await app.listen(3000);
    console.log("server listening at port:3000");
  } catch (e) {
    console.error(e);
  }
}

connectDb().then(() => {
  startApp();
});
