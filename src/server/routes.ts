import * as express from "express";
import {
    getDatabases,
    selectTable,
} from "./connection";
import * as fs from "fs";
import * as dotenv from "dotenv";
const bodyParser = require("body-parser");
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const app = express();
const router = express.Router();

router.get("/api/hello", (req, res, next) => {
    res.json("SingleStore"); //check if SingleStore is working
});

router.post("/setup", bodyParser.json(), async (req, res, next) => {
    const host = req.body.hostname;
    const password = req.body.password;

    try {//steup .env file and populate it with Hostname and Password
        fs.writeFileSync(".env", `HOST="${host}"\nPASSWORD="${password}"`);
    } catch (err) {
        console.error(err);
    }

    try {
        const data = fs.readFileSync(".env", "utf-8");
        console.log({ data });
    } catch (err) {
        console.error(err);
    }

    dotenv.config();

    // const database = "shop";
    // let table = "items";
    // await createDatabase({ database });

    // let columns = [
    //     "id INT auto_increment",
    //     "name VARCHAR(255)",
    //     "price FLOAT",
    //     "key(id)",
    // ];
    // await createTable({ database, table, columns });

    // columns = ["name", "price"];
    // await insertTable({
    //     database,
    //     table,
    //     columns,
    //     values: ["milk", 1.99],
    // });

    // table = "sales";
    // columns = [
    //     "id INT auto_increment",
    //     "item VARCHAR(255)",
    //     "quantity INT",
    //     "date DATE",
    //     "key(id)",
    // ];
    // await createTable({ database, table, columns });

    // columns = ["item", "quantity", "date"];
    // await insertTable({
    //     database,
    //     table,
    //     columns,
    //     values: ["milk", 3, "2023-08-5"],
    // });

    res.json("/SETUP!");
});

router.get("/api/database", async (req, res) => {
    const sqlRes = await getDatabases();
    res.json(sqlRes);
});

// router.post("/api/database", bodyParser.json(), async (req, res) => {
//     console.log("POST /api/database, body:", req.body);

//     const database = req.body.database;
//     const sqlRes = await createDatabase({ database });
//     res.json(sqlRes);
// });

// router.delete("/api/database", bodyParser.json(), async (req, res) => {
//     console.log("DELETE /api/database, body:", req.body);

//     const database = req.body.database;
//     const sqlRes = await deleteDatabase({ database });
//     res.json(sqlRes);
// });

// router.get("/api/database/:database/table/:table", async (req, res) => {
//     const database = req.params.database;
//     const table = req.params.table;
//     console.log(`GET /api/database/${database}/table/${table}`);

//     const sqlRes = await selectTable({ database, table });
//     res.json(sqlRes);
// });

// router.post(
//     "/api/database/:database/table",
//     bodyParser.json(),
//     async (req, res) => {
//         const database = req.params.database;
//         console.log(`POST /api/database/${database}/table, body:`, req.body);

//         const table = req.body.table;
//         const columns = req.body.columns;
//         const sqlRes = await createTable({ database, table, columns });
//         res.json(sqlRes);
//     }
// );

// router.post(
//     "/api/database/:database/table/:table",
//     bodyParser.json(),
//     async (req, res) => {
//         const database = req.params.database;
//         const table = req.params.table;
//         console.log(
//             `POST /api/database/${database}/table/${table}, body:`,
//             req.body
//         );

//         const columns = req.body.columns;
//         const values = req.body.values;
//         const sqlRes = await insertTable({ database, table, columns, values });
//         res.json({ sqlRes });
//     }
// );

export default router;
