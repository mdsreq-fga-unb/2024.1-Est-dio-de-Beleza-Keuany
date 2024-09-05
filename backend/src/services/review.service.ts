import dbPool from "../database/connection";
import mysql from "mysql2/promise";
import { Review } from "../types/types";

const createService = async (body: Review): Promise<number | undefined> => {
    const [result] = await dbPool.query("INSERT INTO REVIEW SET ?", [body]);

    return (result as mysql.OkPacketParams).insertId;
}

const findAllService = async (): Promise<Review[]> => {
    const query = `
        SELECT R.idReview, P.name, R.rating, R.comment, Q.customerName, R.anonymous
            FROM REVIEW R
                JOIN APPOINTMENT A ON R.idAppointment = A.idAppointment
                JOIN \`PROCEDURE\` P ON A.idProcedure = P.idProcedure
                JOIN \`QUEUE\` Q ON A.idAppointment = Q.idAppointment
            ORDER BY A.schedule DESC; 
    `;
    
    const [result] = await dbPool.query(query);

    return result as Review[];
}

const findAllReviewsFromCustomerService = async (customerPhone: string): Promise<Review[]> => {
    const query = `
        SELECT R.idReview, P.name, R.rating, R.comment
            FROM REVIEW R
                JOIN APPOINTMENT A ON R.idAppointment = A.idAppointment
                JOIN \`PROCEDURE\` P ON A.idProcedure = P.idProcedure
                JOIN \`QUEUE\` Q ON A.idAppointment = Q.idAppointment
            WHERE Q.customerPhone = ?
            ORDER BY A.schedule DESC; 
    `;
    
    const [result] = await dbPool.query(query, [customerPhone]);

    return result as Review[];
}

const updateService = async (id: number, updatedData: Partial<Review>): Promise<boolean> => {
    const [result] = await dbPool.query("UPDATE REVIEW SET ? WHERE idReview = ?",
            [updatedData, id]
    );

    const okPacket = result as mysql.OkPacketParams;

    return okPacket.affectedRows && okPacket.affectedRows > 0 ? true : false;
}

const deleteService = async (id: number): Promise<boolean> => {
    const [result] = await dbPool.query("DELETE FROM REVIEW WHERE idReview = ?", [id]);

    const okPacket = result as mysql.OkPacketParams;

    return okPacket.affectedRows && okPacket.affectedRows > 0 ? true : false;
}

export default {
    createService,
    findAllService,
    findAllReviewsFromCustomerService,
    updateService,
    deleteService,
}