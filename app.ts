import express from "express";

import create from "./routes/user/create.ts";
import authorize from "./routes/user/authorize.ts";

const port = process.env?.PORT;

const app = express();

app.use(express.json());
app.use("/user", create);
app.use("/user", authorize);

app.listen(port, () => {
	console.log(`running at http://localhost:${port}`);
});
