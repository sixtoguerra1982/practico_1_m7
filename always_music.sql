CREATE DATABASE always_music;

\c always_music

CREATE TABLE student (
    rut VARCHAR(12),
    nombre VARCHAR(200) NOT NULL,
    curso VARCHAR(10) NOT NULL,
    nivel VARCHAR(10) NOT NULL,
    PRIMARY KEY (rut)
);

INSERT INTO student(rut,nombre,curso,nivel) VALUES ('15.414.390-4','Sixto Guerra','JS27','VESPERTINO');
INSERT INTO student(rut,nombre,curso,nivel) VALUES ('11.111.111-1','Nayareth Nain','JS27','VESPERTINO');
INSERT INTO student(rut,nombre,curso,nivel) VALUES ('22.222.222-2','Daisy Castillo','JS27','VESPERTINO');