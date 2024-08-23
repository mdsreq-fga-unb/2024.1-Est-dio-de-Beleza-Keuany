import dbPool from "../database/connection";
import mysql from "mysql2/promise";
import { Procedure } from "../types/types";

const createProcedureService = async (body: Procedure) => {
    const [result] = await dbPool.query("INSERT INTO `PROCEDURE` SET ?", [body]);

    return (result as mysql.OkPacketParams).insertId;
}

export default {
    createProcedureService
}