import express from "express";

import create from "./routes/user/create.ts";
import login from "./routes/user/login.ts";

const port = process.env?.PORT;

const app = express();

app.use(express.json());
app.use("/user", create);
app.use("/user", login);
app.use((req, res, next) => {
	res.setHeader("Content-Type", "application/json");
	res.status(404).send("Not Found");
});

app.listen(port, () => {
	console.log(`running at http://localhost:${port}`);
});
