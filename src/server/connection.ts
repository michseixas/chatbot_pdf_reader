import * as mysql from "mysql2/promise";
import * as dotenv from "dotenv";

export async function connectSingleStore(
    config: Partial<mysql.ConnectionOptions> = {}
) {
    dotenv.config();

    const baseConfig: mysql.ConnectionOptions = {
        host: process.env.HOST,
        password: process.env.PASSWORD,
        user: "admin",
    };

    return await mysql.createConnection({
        ...baseConfig,
        ...config,
    });
}

export async function stopSingleStore(conn: mysql.Connection) {
    await conn.end();
}

export async function getDatabases({ conn }: { conn?: mysql.Connection } = {}) {
    try {
        let closeConn = false;
        if (!conn) {
            conn = await connectSingleStore();
            closeConn = true;
        }

        const [results] = await conn.query("SHOW DATABASES");
        console.log("get databases:", { results });

        if (closeConn) {
            await stopSingleStore(conn);
        }

        return results;
    } catch (error) {
        console.error({ error });
        return error;
    }
}

// export async function createDatabase({
//     conn,
//     database,
// }: {
//     conn?: mysql.Connection;
//     database: string;
// }) {
//     try {
//         let closeConn = false;
//         if (!conn) {
//             conn = await connectSingleStore();
//             closeConn = true;
//         }

//         const [results] = await conn.query("CREATE DATABASE IF NOT EXISTS ?", [
//             database,
//         ]);
//         console.log("create database:", database, { results });

//         if (closeConn) {
//             await stopSingleStore(conn);
//         }

//         return results;
//     } catch (error) {
//         console.error({ error });
//         return error;
//     }
// }

// export async function deleteDatabase({
//     conn,
//     database,
// }: {
//     conn?: mysql.Connection;
//     database: string;
// }) {
//     try {
//         let closeConn = false;
//         if (!conn) {
//             conn = await connectSingleStore();
//             closeConn = true;
//         }

//         const [results] = await conn.query("DROP DATABASE ?", [database]);
//         console.log("delete database:", database, { results });

//         if (closeConn) {
//             await stopSingleStore(conn);
//         }

//         return results;
//     } catch (error) {
//         console.error({ error });
//         return error;
//     }
// }

// export async function createTable({
//     conn,
//     database,
//     table,
//     columns,
// }: {
//     conn?: mysql.Connection;
//     database: string;
//     table: string;
//     columns: Array<string>;
// }) {
//     try {
//         let closeConn = false;
//         if (!conn) {
//             conn = await connectSingleStore({ database });
//             closeConn = true;
//         }

//         const [results] = await conn.query(
//             `CREATE TABLE IF NOT EXISTS ${table} (${columns.toString()})`
//         );
//         console.log("create table:", table, { results });

//         if (closeConn) {
//             await stopSingleStore(conn);
//         }

//         return results;
//     } catch (error) {
//         console.error({ error });
//         return error;
//     }
// }

export async function selectTable({
    conn,
    database,
    table,
}: {
    conn?: mysql.Connection;
    database: string;
    table: string;
}) {
    try {
        let closeConn = false;
        if (!conn) {
            conn = await connectSingleStore({ database });
            closeConn = true;
        }

        const [rows, fields] = await conn.query(`SELECT * FROM ${table}`);
        console.log("select table:", table, { rows });

        if (closeConn) {
            await stopSingleStore(conn);
        }

        return rows;
    } catch (error) {
        console.error({ error });
        return error;
    }
}

// export async function insertTable({
//     conn,
//     database,
//     table,
//     columns,
//     values,
// }: {
//     conn?: mysql.Connection;
//     database: string;
//     table: string;
//     columns: Array<string>;
//     values: Array<any>;
// }) {
//     try {
//         let closeConn = false;
//         if (!conn) {
//             conn = await connectSingleStore({ database });
//             closeConn = true;
//         }

//         const [results] = await conn.query(
//             `INSERT INTO ${table} (${columns.toString()}) VALUES (?)`,
//             [values]
//         );

//         console.log("insert table:", table, { results });

//         if (closeConn) {
//             await stopSingleStore(conn);
//         }

//         return results;
//     } catch (error) {
//         console.log("put error");
//         console.error(error);
//         // return error;
//     }
// }
