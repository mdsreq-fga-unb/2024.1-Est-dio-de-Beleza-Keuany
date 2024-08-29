import dbPool from "../database/connection";
import mysql from "mysql2/promise";
import { Appointment, Queue } from "../types/types";

const createAppointmentAndQueueService = async (appointmentBody: Appointment, queueBody: Partial<Queue>): Promise<number | undefined> => {
    const connection = await dbPool.getConnection();
    try {
        await connection.beginTransaction();

        const [appointmentResult] = await connection.query("INSERT INTO APPOINTMENT SET ?", [appointmentBody]);
        const appointmentId = (appointmentResult as mysql.OkPacketParams).insertId;

        queueBody.idAppointment = appointmentId;

        await connection.query("INSERT INTO `QUEUE` SET ?", [queueBody]);

        await connection.commit();

        return appointmentId;
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}

const enterQueueService = async (body: Partial<Queue>): Promise<number> => {
    const [oldPos] = await dbPool.query("SELECT COUNT(idAppointment) FROM `QUEUE` WHERE idAppointment = ?", [body.idAppointment]);

    const count = (oldPos as any)[0]['COUNT(idAppointment)'];

    body.position = count + 1;

    if ((count + 1) >= 4) return 0;

    const [result] = await dbPool.query("INSERT INTO `QUEUE` SET ?", [body]);

    const okPacket = result as mysql.OkPacketParams;

    return okPacket.affectedRows && okPacket.affectedRows > 0 ? 1 : 2;
}

export default {
    createAppointmentAndQueueService,
    enterQueueService,
}