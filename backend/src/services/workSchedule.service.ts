import dbPool from "../database/connection";
import mysql from "mysql2/promise";
import { WorkSchedule } from "../types/types";

const createService = async (body: WorkSchedule) => {
    const [result] = await dbPool.query("INSERT INTO WORK_SCHEDULE SET ?", [body]);

    return (result as mysql.OkPacketParams).insertId;
}

const findAllService = async () => {
    const [result] = await dbPool.query("SELECT * FROM WORK_SCHEDULE");

    return result as WorkSchedule[];
}

const findUnavailableDaysService = async () => {
    const [result] = await dbPool.query("SELECT dayOfWeek FROM WORK_SCHEDULE WHERE activeDay = 0");

    return result as Partial<WorkSchedule>[];
}

const updateService = async (id: number, updatedData: Partial<WorkSchedule>): Promise<boolean> => {
    const [result] = await dbPool.query("UPDATE WORK_SCHEDULE SET ? WHERE idWorkSchedule = ?",
                                        [updatedData, id]
    );

    const okPacket = result as mysql.OkPacketParams;

    return okPacket.affectedRows && okPacket.affectedRows > 0 ? true : false;
}

const deleteService = async (id: number): Promise<boolean> => {
    const [result] = await dbPool.query("DELETE FROM WORK_SCHEDULE WHERE idWorkSchedule = ?", [id]);

    const okPacket = result as mysql.OkPacketParams;

    return okPacket.affectedRows && okPacket.affectedRows > 0 ? true : false;
}

export default {
    createService,
    findAllService,
    findUnavailableDaysService,
    updateService,
    deleteService
}