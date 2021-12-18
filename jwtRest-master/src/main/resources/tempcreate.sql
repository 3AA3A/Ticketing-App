drop table FAQ if exists;

CREATE TABLE FAQ
(
    ID        BIGINT not null primary key GENERATED ALWAYS AS IDENTITY (START WITH 1),
    USERID VARCHAR(255) not null REFERENCES USER (ID),
    QUESTION  VARCHAR (1000),
    ANSWER  VARCHAR (1000)
);

insert into FAQ (USERID, QUESTION, ANSWER) values ('jana@jana.com', 'How do I Log-in?', 'Click on the log-in button on the right hand side of the navbar.');
insert into FAQ (USERID, QUESTION, ANSWER) values ('jana@jana.com', 'How do I Log off?', 'Click on the log off button on the right hand side of the navbar.');
insert into FAQ (USERID, QUESTION, ANSWER) values ('sana@sana.com', 'How do I purchase a ticket?', 'Choose the event you like, then click purchase.');
