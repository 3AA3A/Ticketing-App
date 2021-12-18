drop table HISTORYEVENT if exists;
drop table FAVORITEEVENT if exists;
drop table HISTORYPERFORMER if exists;
drop table FAVORITEPERFORMER if exists;
drop table PERFORMERREVIEW if exists;
drop table EVENTPERFORMER if exists;
drop table PROMOTION if exists;
drop table CARTITEM if exists;
drop table PRODUCT if exists;
drop table CART if exists;
drop table EVENT if exists;
drop table COUPON if exists;
drop table GENERALFEEDBACK if exists;
drop table FAQ if exists;
drop table LEVEL if exists;
drop table VENUE if exists;
drop table PERFORMER if exists;
drop table GENRE if exists;
drop table USER if exists;

-- ID field value will match jwtUser username 1-1
CREATE TABLE USER
(
    ID    	VARCHAR(255) 	not null primary key,
    NAME  	VARCHAR(255) 	not null,
    PHONE	CHAR(8)			not null,
    ADDRESS	VARCHAR(255)	not null,
    IMAGE	VARCHAR(255)	not null,
    ROLE  	VARCHAR(255) 	not null
);

insert into USER (ID, NAME, PHONE, ADDRESS, IMAGE, ROLE) values ('mary@mary.com', 'Mary', '45667809', 'Al Markhiya', 'mary.png', 'Customer');
insert into USER (ID, NAME, PHONE, ADDRESS, IMAGE, ROLE) values ('gabe@gabe.com', 'Gabe', '74839512', 'Old Airport', 'gabe.png', 'Customer');
insert into USER (ID, NAME, PHONE, ADDRESS, IMAGE, ROLE) values ('ali@ali.com', 'Ali', '44892367', 'Al Khor', 'ali.png', 'Seller');
insert into USER (ID, NAME, PHONE, ADDRESS, IMAGE, ROLE) values ('fahad@fahad.com', 'Fahad', '73804812', 'Salwa Road', 'fahad.png', 'Seller');
insert into USER (ID, NAME, PHONE, ADDRESS, IMAGE, ROLE) values ('patrick@patrick.com', 'Patrick', '55783214', 'Al Wakrah', 'patrick.png', 'Marketer');
insert into USER (ID, NAME, PHONE, ADDRESS, IMAGE, ROLE) values ('josh@josh.com', 'Josh', '22136778', 'Bin Omran', 'josh.png', 'Admin');
insert into USER (ID, NAME, PHONE, ADDRESS, IMAGE, ROLE) values ('jana@jana.com', 'Jana', '66750481', 'Al Khor', 'jana.png', 'Support');
insert into USER (ID, NAME, PHONE, ADDRESS, IMAGE, ROLE) values ('sana@sana.com', 'Sana', '90846182', 'Matarqadeem', 'sana.png', 'Support');
insert into USER (ID, NAME, PHONE, ADDRESS, IMAGE, ROLE) values ('admin@admin.com', 'Jessica', '95485865', 'Doha', 'jessica.png', 'Admin');
insert into USER (ID, NAME, PHONE, ADDRESS, IMAGE, ROLE) values ('student@student.com', 'Student', '55678910', 'Doha', 'student.png', 'Customer');

CREATE TABLE GENRE
(
    ID		BIGINT			not null primary key GENERATED ALWAYS AS IDENTITY (START WITH 1),
    NAME	VARCHAR(255)	not null,
    DESC	VARCHAR(255)	not null
);

insert into GENRE (NAME, DESC) VALUES ('Jazz', 'Jazz is a music genre that originated in the African-American communities of New Orleans, Louisiana, United States, in the late 19th and early 20th centuries, with its roots in blues and ragtime.');
insert into GENRE (NAME, DESC) VALUES ('Pop', 'During the 1950s and 1960s, pop encompassed rock and roll and the youth-oriented styles it influenced.');
insert into GENRE (NAME, DESC) VALUES ('Punk Rock', 'Punk rock is a music genre that emerged in the mid-1970s. Rooted in 1960s garage rock, punk bands rejected the perceived excesses of mainstream 1970s rock.');
insert into GENRE (NAME, DESC) VALUES ('Indie', 'Independent music is music produced independently from commercial record labels or their subsidiaries, a process that may include an autonomous, do-it-yourself approach to recording and publishing.');
insert into GENRE (NAME, DESC) VALUES ('Metal', 'Heavy metal bands developed a thick, massive sound, characterized by distortion, extended guitar solos, emphatic beats, and loudness. The lyrics and performances are sometimes associated with aggression and machismo.');

CREATE TABLE PERFORMER
(
    ID			BIGINT			not null primary key GENERATED ALWAYS AS IDENTITY (START WITH 1),
    NAME		VARCHAR(255)	not null,
    TYPE		VARCHAR(255)	not null,
    IMAGE		VARCHAR(255)	not null,
    VIEWAMOUNT	INT				not null
);

insert into PERFORMER (NAME, TYPE, IMAGE, VIEWAMOUNT) values ('Carly Rae Jepsen', 'Solo', 'crj.png', '0');
insert into PERFORMER (NAME, TYPE, IMAGE, VIEWAMOUNT) values ('Of Monsters and Men', 'Band', 'omam.png',' 0');
insert into PERFORMER (NAME, TYPE, IMAGE, VIEWAMOUNT) values ('Jinjer', 'Band', 'jinjer.png', '0');
insert into PERFORMER (NAME, TYPE, IMAGE, VIEWAMOUNT) values ('Tamino', 'Solo', 'tamino.png', '0');
insert into PERFORMER (NAME, TYPE, IMAGE, VIEWAMOUNT) values ('Taylor Swift', 'Solo', 'ts.png', '0');


CREATE TABLE VENUE
(
    ID			BIGINT			not null primary key GENERATED ALWAYS AS IDENTITY (START WITH 1),
    NAME		VARCHAR(255)	not null,
    CITY		VARCHAR(255)	not null,
    IMAGE		VARCHAR(255)	not null,
    CAPACITY	INT			not null
);

insert into VENUE (NAME, CITY, IMAGE, CAPACITY) values ('Banana Island Resort', 'Doha', 'bananaisland.png', '500');
insert into VENUE (NAME, CITY, IMAGE, CAPACITY) values ('Katara Opera House', 'Doha', 'katara.png', '900');
insert into VENUE (NAME, CITY, IMAGE, CAPACITY) values ('Regency Halls', 'Doha', 'regencyhalls.png', '650');

CREATE TABLE LEVEL
(
    ID		BIGINT			not null primary key GENERATED ALWAYS AS IDENTITY (START WITH 1),
    NAME	CHAR(2)			not null,
    DESC	VARCHAR(255)	not null,
    ADD		INT				not null
);

insert into LEVEL (NAME, DESC, ADD) values ('GA', 'General Admission; Access to General Admission Areas.', '0');
insert into LEVEL (NAME, DESC, ADD) values ('GL', 'Gold; Access to Reserved Seat in Sections B or C as well as all General Admission Areas.', '25');
insert into LEVEL (NAME, DESC, ADD) values ('DM', 'Diamond; Access to Reserved Seat in Section A as well as all General Admission Areas.', '50');
insert into LEVEL (NAME, DESC, ADD) values ('PT', 'Platinum; Access to Section A, Backstage Pass included.', '100');

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

CREATE TABLE GENERALFEEDBACK
(
    ID        BIGINT not null primary key GENERATED ALWAYS AS IDENTITY (START WITH 1),
    USERID VARCHAR(255) not null REFERENCES USER (ID),
    DATEMADE TIMESTAMP,
    TITLE  VARCHAR(255),
    FEEDBACK  VARCHAR(1000),
    REPLY  VARCHAR(1000),
    VIEWED  VARCHAR(255)
);

insert into GENERALFEEDBACK (USERID, DATEMADE, TITLE, FEEDBACK, REPLY, VIEWED) values ('mary@mary.com', DATE '2020-01-27', 'Love This Site', 'Honestly, the best site for ticket purchaing on the internet today!!!', 'Thank You very much, we appreciate it.', 'YES' );
insert into GENERALFEEDBACK (USERID, DATEMADE, TITLE, FEEDBACK, REPLY, VIEWED) values ('gabe@gabe.com', DATE '2020-11-09', 'So Much To Choose From', 'This site has so many events and artists for me to choose from.', 'We pride ourselves with our exclusive collection of events in order to ensure our customers benifit greatly', 'YES' );
insert into GENERALFEEDBACK (USERID, DATEMADE, TITLE, FEEDBACK, REPLY, VIEWED) values ('gabe@gabe.com', DATE '2021-02-15', 'Wished I Found this Site Sooner', 'Honestly, the best site for ticket purchaing on the internet today!!!', 'We love to hear that, help us by spreading the word.', 'YES' );

CREATE TABLE COUPON
(
    ID        BIGINT not null primary key GENERATED ALWAYS AS IDENTITY (START WITH 1),
    USERID VARCHAR(255) not null REFERENCES USER (ID),
    DISCOUNT  BIGINT,
    DATEVALID TIMESTAMP,
    COUPCODE VARCHAR(255)
);

insert into COUPON (USERID, DISCOUNT, DATEVALID, COUPCODE) values ('mary@mary.com', 10, DATE '2021-11-09', 'fSUccJwaK7');
insert into COUPON (USERID, DISCOUNT, DATEVALID, COUPCODE) values ('gabe@gabe.com', 5, DATE '2022-07-22', 'kMT8btMLi1');
insert into COUPON (USERID, DISCOUNT, DATEVALID, COUPCODE) values ('gabe@gabe.com', 15, DATE '2020-09-18', 'qOFcfbtwuS');

CREATE TABLE EVENT
(
    ID     BIGINT       not null primary key GENERATED ALWAYS AS IDENTITY (START WITH 1),
    NAME VARCHAR(255) not null,
    STARTDATE TIMESTAMP not null,
    ENDDATE TIMESTAMP not null,
    VIEWAMOUNT BIGINT not null,
    USERID VARCHAR(255) not null REFERENCES USER (ID),
    GENREID BIGINT not null REFERENCES GENRE (ID),
    VENUEID BIGINT not null REFERENCES VENUE (ID)
);

insert into EVENT (NAME, STARTDATE, ENDDATE, VIEWAMOUNT, USERID, GENREID, VENUEID) VALUES ('Good Vibes Festival 2021', DATE '2021-4-13', DATE '2021-4-14', 0, 'ali@ali.com', 1, 1);
insert into EVENT (NAME, STARTDATE, ENDDATE, VIEWAMOUNT, USERID, GENREID, VENUEID) VALUES ('Airwaves Festival 2021', DATE '2021-5-20', DATE '2021-5-21', 0, 'fahad@fahad.com', 2, 3);
insert into EVENT (NAME, STARTDATE, ENDDATE, VIEWAMOUNT, USERID, GENREID, VENUEID) VALUES ('Bluesfest 2021', DATE '2021-5-25', DATE '2021-5-28', 0, 'ali@ali.com', 4, 2);
insert into EVENT (NAME, STARTDATE, ENDDATE, VIEWAMOUNT, USERID, GENREID, VENUEID) VALUES ('Impericon Festival 2021', DATE '2021-7-2', DATE '2021-7-7', 0, 'fahad@fahad.com', 5, 3);
insert into EVENT (NAME, STARTDATE, ENDDATE, VIEWAMOUNT, USERID, GENREID, VENUEID) VALUES ('Summer Sonic Festival 2021', DATE '2021-10-17', DATE '2021-10-21', 0, 'ali@ali.com', 3, 1);

CREATE TABLE CART
(
    ID     	BIGINT       	not null primary key GENERATED ALWAYS AS IDENTITY (START WITH 1),
    STATUS 	VARCHAR(255)	not null,
    USERID 	VARCHAR(255) 	not null REFERENCES USER (ID),
    COUPONID BIGINT			REFERENCES COUPON (ID)
);

insert into CART (STATUS, USERID, COUPONID) values ('unpaid', 'gabe@gabe.com', NULL);

CREATE TABLE PRODUCT
(
    ID    	BIGINT	not null primary key GENERATED ALWAYS AS IDENTITY (START WITH 1),
    PRICE	INT		not null,
    AMOUNT	INT		not null,
    LEVELID	BIGINT	not null REFERENCES LEVEL (ID),
    EVENTID	BIGINT	not null REFERENCES EVENT (ID)
);

insert into PRODUCT (PRICE, AMOUNT, LEVELID, EVENTID) values (150, 200, 1, 1);
insert into PRODUCT (PRICE, AMOUNT, LEVELID, EVENTID) values (175, 50, 2, 2);
insert into PRODUCT (PRICE, AMOUNT, LEVELID, EVENTID) values (150, 100, 2, 1);
insert into PRODUCT (PRICE, AMOUNT, LEVELID, EVENTID) values (200, 300, 3, 3);

CREATE TABLE CARTITEM
(
    ID        BIGINT not null primary key GENERATED ALWAYS AS IDENTITY (START WITH 1),
    QUANTITY  INT    not null,
    CARTID    BIGINT not null REFERENCES CART (ID),
    PRODUCTID BIGINT not null REFERENCES PRODUCT (ID)
);

CREATE TABLE PROMOTION
(
    ID     BIGINT       not null primary key GENERATED ALWAYS AS IDENTITY (START WITH 1),
    DISCOUNTAMOUNT BIGINT not null,
    DATEFROM TIMESTAMP not null,
    DATETO TIMESTAMP not null,
    EVENTID BIGINT not null REFERENCES EVENT (ID)
);

insert into PROMOTION (DISCOUNTAMOUNT, DATEFROM, DATETO, EVENTID) VALUES (20, DATE '2021-4-1', DATE '2021-4-5', 1);
insert into PROMOTION (DISCOUNTAMOUNT, DATEFROM, DATETO, EVENTID) VALUES (25, DATE '2021-5-1', DATE '2021-5-7', 2);
insert into PROMOTION (DISCOUNTAMOUNT, DATEFROM, DATETO, EVENTID) VALUES (30, DATE '2021-5-10', DATE '2021-5-15', 3);

CREATE TABLE EVENTPERFORMER
(
    ID     BIGINT       not null primary key GENERATED ALWAYS AS IDENTITY (START WITH 1),
    PERFORMDATE TIMESTAMP not null,
    PERFORMTIME VARCHAR(255) not null,
    EVENTID BIGINT not null REFERENCES EVENT (ID),
    PERFORMERID BIGINT not null REFERENCES PERFORMER (ID)
);

insert into EVENTPERFORMER (PERFORMDATE, PERFORMTIME, EVENTID, PERFORMERID) VALUES (DATE '2021-4-13', '2:00 PM', 1, 1);
insert into EVENTPERFORMER (PERFORMDATE, PERFORMTIME, EVENTID, PERFORMERID) VALUES (DATE '2021-4-13', '5:00 PM', 1, 5);
insert into EVENTPERFORMER (PERFORMDATE, PERFORMTIME, EVENTID, PERFORMERID) VALUES (DATE '2021-4-14', '11:00 AM', 1, 4);
insert into EVENTPERFORMER (PERFORMDATE, PERFORMTIME, EVENTID, PERFORMERID) VALUES (DATE '2021-5-20', '1:00 PM', 2, 3);
insert into EVENTPERFORMER (PERFORMDATE, PERFORMTIME, EVENTID, PERFORMERID) VALUES (DATE '2021-5-25', '4:00 PM', 3, 2);

CREATE TABLE PERFORMERREVIEW
(
    ID     BIGINT       not null primary key GENERATED ALWAYS AS IDENTITY (START WITH 1),
    REVDATE TIMESTAMP not null,
    REVIEW VARCHAR (1000)not null,
    USERID VARCHAR(255) not null REFERENCES USER (ID),
    PERFORMERID BIGINT not null REFERENCES PERFORMER (ID)
);

insert into PERFORMERREVIEW (REVDATE, REVIEW, USERID, PERFORMERID) VALUES (DATE '2021-3-8', 'Truly the GOAT', 'mary@mary.com', 1);
insert into PERFORMERREVIEW (REVDATE, REVIEW, USERID, PERFORMERID) VALUES (DATE '2021-3-8', 'One of the best bands ever', 'gabe@gabe.com', 2);
insert into PERFORMERREVIEW (REVDATE, REVIEW, USERID, PERFORMERID) VALUES (DATE '2021-3-8', 'She has a very good voice and its truly such a pleasure to listen', 'gabe@gabe.com', 5);

CREATE TABLE FAVORITEPERFORMER
(
    ID        BIGINT not null primary key GENERATED ALWAYS AS IDENTITY (START WITH 1),
    USERID VARCHAR(255) not null REFERENCES USER (ID),
    PERFORMERID BIGINT not null REFERENCES PERFORMER (ID)
);

insert into FAVORITEPERFORMER (USERID, PERFORMERID) values ('mary@mary.com', 1);
insert into FAVORITEPERFORMER (USERID, PERFORMERID) values ('gabe@gabe.com', 2);
insert into FAVORITEPERFORMER (USERID, PERFORMERID) values ('gabe@gabe.com', 3);

CREATE TABLE HISTORYPERFORMER
(
    ID        BIGINT not null primary key GENERATED ALWAYS AS IDENTITY (START WITH 1),
    USERID VARCHAR(255) not null REFERENCES USER (ID),
    PERFORMERID BIGINT not null REFERENCES PERFORMER (ID)
);

insert into HISTORYPERFORMER (USERID, PERFORMERID) values ('mary@mary.com', 1);
insert into HISTORYPERFORMER (USERID, PERFORMERID) values ('gabe@gabe.com', 3);
insert into HISTORYPERFORMER (USERID, PERFORMERID) values ('gabe@gabe.com', 2);

CREATE TABLE FAVORITEEVENT
(
    ID        BIGINT not null primary key GENERATED ALWAYS AS IDENTITY (START WITH 1),
    USERID VARCHAR(255) not null REFERENCES USER (ID),
    EVENTID BIGINT not null REFERENCES EVENT (ID)
);

insert into FAVORITEEVENT (USERID, EVENTID) values ('mary@mary.com', 3);
insert into FAVORITEEVENT (USERID, EVENTID) values ('gabe@gabe.com', 1);
insert into FAVORITEEVENT (USERID, EVENTID) values ('mary@mary.com', 2);

CREATE TABLE HISTORYEVENT
(
    ID        BIGINT not null primary key GENERATED ALWAYS AS IDENTITY (START WITH 1),
    USERID VARCHAR(255) not null REFERENCES USER (ID),
    EVENTID BIGINT not null REFERENCES EVENT (ID)
);

insert into HISTORYEVENT (USERID, EVENTID) values ('gabe@gabe.com', 1);
insert into HISTORYEVENT (USERID, EVENTID) values ('mary@mary.com', 1);
insert into HISTORYEVENT (USERID, EVENTID) values ('mary@mary.com', 3);
