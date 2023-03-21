import cors from "cors";
import express from "express";

import { fetchTodos } from "./services/jsonplaceholder.js";

const app = express();
// TODO: Serverless Function - Modifikasi Kode (1)
// port sudah tidak digunakan lagi di dalam aplikasi
// jadi boleh di comment saja
// const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    message: "echo OK",
    environmentSecret: process.env.SECRET ?? "Secret not Provided",
  });
});

app.get("/api", async (req, res) => {
  const data = await fetchTodos();

  res.status(200).json({
    statusCode: 200,
    data,
  });
});

// TODO: Serverless Function - Modifikasi Kode (2)
// Pada aplikasi berbasis Serverless Function
// Umumnya kita hanya akan mengexport Function saja
// (Jadi di dalam kodenya, tidak ada runner / main function yang dijalankan sama sekali)
// Sama dengan aplikasi express ini, jadinya tidak boleh ada listen
// Di comment saja listennya
// app.listen(port, (_) => console.log(`apps is listen @ port ${port}`));

// TODO: Serverless Function - Modifikasi Kode (3)
// Sebagai gantinya, di sini kita harus export Function kita
// Karena di sini di-treat sebagai module (package.json -> type: "module")
// Maka di sini menggunakan export default

// Apabila di treat sebagai non-module (CJS),
// Maka gunakan "module.exports = app;"
export default app;
