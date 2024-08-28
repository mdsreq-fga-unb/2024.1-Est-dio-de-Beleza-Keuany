import dbPool from "../database/connection";
import mysql from "mysql2/promise";
import { ExceptionSchedule } from "../types/types";

const createService = async (body: ExceptionSchedule) => {
    const [result] = await dbPool.query("INSERT INTO EXCEPTION_SCHEDULE SET ?", [body]);

    return (result as mysql.OkPacketParams).insertId;
}

const findAllService = async () => {
    const [result] = await dbPool.query("SELECT idExceptionSchedule, DATE_FORMAT(exceptionDate, '%Y-%m-%d') as exceptionDate, startTime, endTime, isAvailable FROM EXCEPTION_SCHEDULE");

    return result as ExceptionSchedule[];
}

const findOneByDateService = async (date: string): Promise<ExceptionSchedule | null> => {
    const [result] = await dbPool.query("SELECT * FROM EXCEPTION_SCHEDULE WHERE exceptionDate = ?",
                                        [date]
    );

    const rows = result as ExceptionSchedule[];

    if (rows.length > 0) {
        rows[0].exceptionDate = new Date(rows[0].exceptionDate).toISOString().split('T')[0];
        return rows[0];
    }
    return null;
}

const findUnavailableDaysService = async (month: string, year: string) => {
    const [result] = await dbPool.query("SELECT DAY(exceptionDate) AS day, isAvailable FROM EXCEPTION_SCHEDULE WHERE MONTH(exceptionDate) = ? AND YEAR(exceptionDate) = ?",
                                        [month, year]
    );

    return result as Partial<ExceptionSchedule>;
}

const updateService = async (id: number, updatedData: Partial<ExceptionSchedule>): Promise<boolean> => {
    const [result] = await dbPool.query("UPDATE EXCEPTION_SCHEDULE SET ? WHERE idExceptionSchedule = ?",
                                        [updatedData, id]
    );

    const okPacket = result as mysql.OkPacketParams;

    return okPacket.affectedRows && okPacket.affectedRows > 0 ? true : false;
}

const deleteService = async (id: number): Promise<boolean> => {
    const [result] = await dbPool.query("DELETE FROM EXCEPTION_SCHEDULE WHERE idExceptionSchedule = ?", [id]);

    const okPacket = result as mysql.OkPacketParams;

    return okPacket.affectedRows && okPacket.affectedRows > 0 ? true : false;
}

export default {
    createService,
    findAllService,
    findOneByDateService,
    findUnavailableDaysService,
    updateService,
    deleteService
}