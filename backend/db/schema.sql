CREATE TABLE IF NOT EXISTS `PROCEDURE` (
    idProcedure INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    duration INT NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    procedureStatus INT DEFAULT 1, -- procedimento está ativo ou não
    `description` VARCHAR(200),
    CONSTRAINT PROCEDIMENTO_PK PRIMARY KEY (idProcedure)
);

CREATE TABLE IF NOT EXISTS APPOINTMENT (
    idAppointment INT NOT NULL AUTO_INCREMENT,
    schedule DATETIME NOT NULL,
    status INT, -- 0 agendado | fila / 1 confirmado / 2 finalizado / 3 cancelado
    idProcedure INT,
    CONSTRAINT APPOINTMENT_PK PRIMARY KEY (idAppointment),
    CONSTRAINT APPOINTMENT_PROCEDURE_FK FOREIGN KEY (idProcedure)
        REFERENCES `PROCEDURE` (idProcedure)
            ON UPDATE CASCADE
            ON DELETE SET NULL,
    CONSTRAINT APPOINTMENT_UK UNIQUE (schedule)
);

CREATE TABLE IF NOT EXISTS REVIEW (
    idReview INT NOT NULL AUTO_INCREMENT,
    rating INT NOT NULL,
    anonymous INT NOT NULL,
    comment VARCHAR(500),
    idAppointment INT,
    CONSTRAINT REVIEW_PK PRIMARY KEY (idReview),
    CONSTRAINT REVIEW_APPOINTMENT_FK FOREIGN KEY (idAppointment)
        REFERENCES APPOINTMENT (idAppointment)
            ON UPDATE CASCADE
            ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS `QUEUE` (
    customerPhone VARCHAR(11) NOT NULL,
    customerName VARCHAR(100) NOT NULL,
    position INT NOT NULL,
    idAppointment INT,
    CONSTRAINT QUEUE_APPOINTMENT_FK FOREIGN KEY (idAppointment)
        REFERENCES APPOINTMENT (idAppointment)
            ON UPDATE CASCADE
            ON DELETE CASCADE,
    INDEX QUEUE_idAppointment_IDX (idAppointment),
    CONSTRAINT QUEUE_UK UNIQUE (customerPhone, idAppointment)
);

CREATE TABLE IF NOT EXISTS WORK_SCHEDULE (
    idWorkSchedule INT NOT NULL AUTO_INCREMENT,
    dayOfWeek ENUM('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN') NOT NULL,
    startTime TIME NOT NULL,
    endTime TIME NOT NULL,
    activeDay INT NOT NULL,
    CONSTRAINT WORK_SCHEDULE_PK PRIMARY KEY (idWorkSchedule),
    CONSTRAINT WORK_SCHEDULE_UK UNIQUE (dayOfWeek)
);

CREATE TABLE IF NOT EXISTS EXCEPTION_SCHEDULE (
    idExceptionSchedule INT NOT NULL AUTO_INCREMENT,
    exceptionDate DATE NOT NULL,
    startTime TIME,
    endTime TIME,
    isAvailable INT NOT NULL, -- diz se irá trabalhar ou não
    CONSTRAINT EXCEPTION_SCHEDULE_PK PRIMARY KEY (idExceptionSchedule),
    INDEX EXCEPTION_SCHEDULE_exceptionDate_IDX (exceptionDate)
);

-- Populando a grade horária
INSERT INTO WORK_SCHEDULE (dayOfWeek, startTime, endTime, activeDay) VALUES 
    ("MON", "08:00", "18:00", 1),
    ("TUE", "08:00", "18:00", 1),
    ("WED", "08:00", "18:00", 1),
    ("THU", "08:00", "18:00", 1),
    ("FRI", "08:00", "18:00", 1),
    ("SAT", "10:00", "16:00", 1),
    ("SUN", "08:00", "18:00", 0);
