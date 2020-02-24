
DROP TABLE IF EXISTS "TB_HEROIS";

CREATE TABLE "TB_HEROIS" (
  "id" serial NOT NULL,
  "nome" character varying(250) NULL,
  "poder" character(250) NULL
)


--CREATE
insert into "TB_HEROIS" (nome, poder) 
values 
('Flash', 'Velocidae'),
('Aquaman', 'Falar com animais'),
('Batman', 'Dinheiro')

--READ
select * from "TB_HEROIS" 
select * from "TB_HEROIS" where nome = 'Flash'
select nome from "TB_HEROIS" where nome = 'Flash'

--UPDATE
update "TB_HEROIS" set nome = 'Goku', Poder = 'Deus' where id = 1

--delete
delete from "TB_HEROIS" where id = 2