const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// 🔥 CORS (importante para frontend online)
app.use(cors({
  origin: "*"
}));

app.use(express.json());

// 🔥 Conexión a Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo conectado"))
  .catch(err => console.log(err));

// 🔥 Ruta raíz (CLAVE para Render)
app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});

// 🔥 Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// 🔥 Manejo de errores (evita HTML)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: "Error interno del servidor" });
});

// 🔥 Puerto dinámico para Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server corriendo en puerto " + PORT);
});