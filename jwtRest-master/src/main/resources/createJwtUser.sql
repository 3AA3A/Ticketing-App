drop table jwt_User if exists;

create table jwt_User (
    id bigint primary key GENERATED ALWAYS AS IDENTITY(START WITH 1),
    username varchar(50) not null,
    password varchar(60) not null,
    role varchar(50) default 'ROLE_USER'
);

insert into jwt_User (username, password) values ('joe@joe.com', '$2a$10$xZ5Hq/WNG8A.Viujt26uKOaT1l0rNUKS3gDhTWuyNKQ6CjnFgJ26W');
insert into jwt_User (username, password) values ('ann@ann.com', '$2a$10$oPYMdYOC58/jEIxchTu8cuJyaCICUxbURzrnyKeUbpT1ECIePU3Ky');
insert into jwt_User (username, password) values ('fred@fred.com', '$2a$10$Qmtk.1EtQvLVJC1N5EY.muYdMjU5l3dy3TyUoC8J43dDBQUw2o2EO');
insert into jwt_User (username, password) values ('admin@admin.com', '$2a$10$ncFNgFU70d20U/YLHC.pBOAgGBUaRJUCNUsRfqilvQ0OI67mtJx.6');
