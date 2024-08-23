CREATE TABLE IF NOT EXISTS `PROCEDURE` (
    idProcedure INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50),
    duration INT,
    price DECIMAL(5,2),
    `description` VARCHAR(200),
    CONSTRAINT PROCEDIMENTO_PK PRIMARY KEY (idProcedure)
);

CREATE TABLE IF NOT EXISTS APPOINTMENT (
    idAppointment INT NOT NULL AUTO_INCREMENT,
    schedule DATETIME,
    status INT,
    idProcedure INT,
    CONSTRAINT APPOINTMENT_PK PRIMARY KEY (idAppointment),
    CONSTRAINT APPOINTMENT_PROCEDURE_FK FOREIGN KEY (idProcedure)
        REFERENCES `PROCEDURE` (idProcedure)
            ON UPDATE CASCADE
            ON DELETE SET NULL,
    INDEX APPOINTMENT_schedule_IDX (schedule)
);

CREATE TABLE IF NOT EXISTS REVIEW (
    idReview INT NOT NULL AUTO_INCREMENT,
    rating INT,
    comment VARCHAR(500),
    idAppointment INT,
    CONSTRAINT REVIEW_PK PRIMARY KEY (idReview),
    CONSTRAINT REVIEW_APPOINTMENT_FK FOREIGN KEY (idAppointment)
        REFERENCES APPOINTMENT (idAppointment)
            ON UPDATE CASCADE
            ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS `QUEUE` (
    customerPhone VARCHAR(11),
    position INT,
    idAppointment INT,
    CONSTRAINT QUEUE_APPOINTMENT_FK FOREIGN KEY (idAppointment)
        REFERENCES APPOINTMENT (idAppointment)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
    INDEX QUEUE_idAppointment_IDX (idAppointment)
);