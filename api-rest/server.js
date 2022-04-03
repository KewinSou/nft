const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
const { router } = require("./routes/index");

app.use(router);
app.use(cors());
app.use(bodyParser.json());

const server = app.listen(5000, () => {
  console.log("API rodando na porta 5000");
});
