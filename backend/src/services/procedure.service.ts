import dbPool from "../database/connection";
import mysql from "mysql2/promise";
import { Procedure } from "../types/types";

const createService = async (body: Procedure) => {
    const [result] = await dbPool.query("INSERT INTO `PROCEDURE` SET ?", [body]);

    return (result as mysql.OkPacketParams).insertId;
}

const findAllService = async (): Promise<Procedure[]> => {
    const [result] = await dbPool.query("SELECT * FROM `PROCEDURE`");

    return result as Procedure[];
}

const updateService = async (id: number, updatedData: Partial<Procedure>): Promise<boolean> => {
    const [result] = await dbPool.query("UPDATE `PROCEDURE` SET ? WHERE idProcedure = ?",
                                        [updatedData, id]
    );

    const okPacket = result as mysql.OkPacketParams;

    return okPacket.affectedRows && okPacket.affectedRows > 0 ? true : false;
}

const deleteService = async (id: number): Promise<boolean> => {
    const [result] = await dbPool.query("DELETE FROM `PROCEDURE` WHERE idProcedure = ?", [id]);

    const okPacket = result as mysql.OkPacketParams;

    return okPacket.affectedRows && okPacket.affectedRows > 0 ? true : false;
}

export default {
    createService,
    findAllService,
    updateService,
    deleteService
}