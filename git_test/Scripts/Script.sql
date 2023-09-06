CREATE TABLE JUVE_MEMBER(
	JM_ID varchar2(16 char) PRIMARY KEY,
	JM_PASSWORD varchar2(64 char) NOT NULL,
	JM_NAME varchar2(4 char) NOT NULL,
	JM_ADDRESS varchar2(100 char) NOT NULL,
	JM_PHONE varchar2(13 char) NOT NULL,
	JM_TEL varchar2(14 char),
	JM_EMAIL varchar2(50 char) NOT NULL,
	JM_GENDER char (1 char) DEFAULT '0',
	JM_BIRTH DATE,
	JM_MILEAGE number(7) NOT null
);

ALTER TABLE JUVE_MEMBER ADD JM_AGE NUMBER;

-- JM_BIRTH 컬럼이 갱신되거나 새로운 레코드가 삽입될 때마다 JM_AGE 컬럼을 업데이트하도록 트리거를 생성
CREATE OR REPLACE TRIGGER Update_JM_Age
BEFORE INSERT OR UPDATE ON JUVE_MEMBER
FOR EACH ROW
DECLARE
    v_current_year NUMBER;
BEGIN
    -- 현재 년도 가져오기
    SELECT TO_NUMBER(TO_CHAR(SYSDATE, 'YYYY')) INTO v_current_year FROM DUAL;
    
    IF :NEW.JM_BIRTH IS NOT NULL THEN
        -- 생년월일로 나이 계산
        :NEW.JM_AGE := v_current_year - TO_NUMBER(TO_CHAR(:NEW.JM_BIRTH, 'YYYY')) + 1;
    ELSE
        :NEW.JM_AGE := NULL;
    END IF;
END;
/
-- 위에 등록한 트리거 조회
SELECT trigger_name, table_name, triggering_event
FROM all_triggers
WHERE owner = 'juve'; 
-- juve 계정에 속한 트리거 조회


-- 현재년도를 기준으로 나이를 갱신하는 프로시저를 등록
CREATE OR REPLACE PROCEDURE UPDATE_JM_AGE_PROC AS
    v_current_year NUMBER;
BEGIN
    -- 현재 년도 가져오기
    SELECT TO_NUMBER(TO_CHAR(SYSDATE, 'YYYY')) INTO v_current_year FROM DUAL;

    UPDATE JUVE_MEMBER
    SET JM_AGE = (
        SELECT v_current_year - TO_NUMBER(TO_CHAR(JM_BIRTH, 'YYYY')) + 1
        FROM JUVE_MEMBER
        WHERE JM_BIRTH IS NOT NULL
    );
END;
/
-- 위에 등록한 프로시저 실행
BEGIN
    UPDATE_JM_AGE_PROC;
END;
/


 -- juve 계정에 속한 프로시저 조회
SELECT object_name, object_type
FROM all_objects
WHERE owner = 'juve' AND object_type = 'PROCEDURE';

-- 매년 1월 1일마다 JM_AGE 값을 현재 나이로 갱신하는 작업을 Oracle의 스케줄러인 DBMS_SCHEDULER로 등록

BEGIN
    DBMS_SCHEDULER.create_job(
        job_name        => 'UPDATE_JM_AGE_JOB',
        job_type        => 'PLSQL_BLOCK',
        job_action      => 'BEGIN UPDATE_JM_AGE_PROC; END;',
        start_date      => TO_TIMESTAMP_TZ('2023-01-01 00:00:00 UTC', 'YYYY-MM-DD HH24:MI:SS TZR'),
        repeat_interval => 'FREQ=YEARLY; BYDATE=0101',
        enabled         => TRUE
    );
END;
/

-- juve 계정에 속한 스케쥴러 조회
SELECT job_name, job_type, job_action, start_date, repeat_interval, enabled
FROM all_scheduler_jobs
WHERE owner = 'juve'; 


--DELETE FROM JUVE_MEMBER;

SELECT * FROM JUVE_MEMBER ;

CREATE TABLE JUVE_PRODUCT(
	JP_PRODUCTCODE varchar2(7 char) PRIMARY KEY,
	JP_CATEGORY varchar2(3 char) NOT NULL,
	JP_PRODUCTNUM number(3) NOT NULL,
	JP_PRODUCTNAME varchar2(50 char) NOT NULL,
	JP_PRODUCTPRICE number(6) NOT NULL,
	JP_PRODUCTPHOTO varchar2(200 char)
);


--DROP TABLE JUVE_PRODUCT;

--DELETE FROM JUVE_PRODUCT;

--SELECT * FROM juve_product;
--
--	private String id;
--	private String destination;
--	private String name;
--	private String address;
--	private String phone;
--	private String tel;
--	private String isDefalut;
--	private Date regDate;

CREATE TABLE JUVE_MEMBER_SHIPMENT(
	JMS_NO number(5) PRIMARY KEY,
	JMS_ID varchar2(16 char) NOT NULL,
	JMS_DESTINATION varchar2(30 char) NOT NULL,
	JMS_NAME varchar2(4 char) NOT NULL,
	JMS_ADDRESS varchar2(100 char) NOT NULL,
	JMS_PHONE varchar2(13 char) NOT NULL,
	JMS_TEL varchar2(14 char),
	JMS_ISDEFAULT char(1 char) NOT NULL,
	JMS_REGDATE DATE NOT NULL,
	CONSTRAINT SHIPMENT_MEMBER
		FOREIGN KEY(JMS_ID) REFERENCES JUVE_MEMBER(JM_ID)
		ON DELETE cascade
);

CREATE OR REPLACE TRIGGER MAX_SHIPMENTS
BEFORE INSERT ON JUVE_MEMBER_SHIPMENT
FOR EACH ROW
DECLARE
    shipment_count NUMBER;
BEGIN
    SELECT COUNT(*) INTO shipment_count
    FROM JUVE_MEMBER_SHIPMENT
    WHERE JMS_ID = :NEW.JMS_ID;
    
    IF shipment_count >= 5 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Maximum of 5 shipments per ID exceeded');
    END IF;
END;

SELECT * FROM JUVE_MEMBER_SHIPMENT;

INSERT INTO JUVE_MEMBER_SHIPMENT (
  JMS_NO,
  JMS_ID,
  JMS_DESTINATION,
  JMS_NAME,
  JMS_ADDRESS,
  JMS_PHONE,
  JMS_TEL,
  JMS_ISDEFAULT,
  JMS_REGDATE
)
VALUES (
  JUVE_MEMBER_SHIPMENT_SEQ.nextval,
  'test',
  '목적지',
  '이름',
  '주소',
  '1-2-3',
  '1-2-3',
  'Y',
  sysdate
);



SELECT * FROM JUVE_MEMBER_SHIPMENT;

DELETE FROM JUVE_MEMBER_SHIPMENT;

CREATE SEQUENCE JUVE_MEMBER_SHIPMENT_SEQ;

CREATE TABLE JUVE_BBS(
JB_NO number(6) PRIMARY KEY,
JB_BBS_TYPE varchar2(3 char) NOT NULL,
JB_BBS_CATEGORY varchar2(4 char),
JB_BBS_WRITER varchar2(4 char) NOT NULL,
JB_BBS_TITLE varchar2(100 char),
JB_BBS_CONTEXT varchar2(4000 char) NOT NULL,
JB_BBS_DATE DATE NOT NULL,
JB_BBS_HITS number(6),
JB_BBS_RECOMMENDS number(3),
JB_BBS_ISPUBLIC char(1 char) NOT NULL
);

CREATE SEQUENCE JUVE_BBS_SEQ;

ALTER TABLE JUVE_BBS
ADD JB_BBS_PASSWORD varchar2(30 char);

ALTER TABLE JUVE_BBS
RENAME COLUMN JB_BBS_RECOMEND TO JB_BBS_RECOMMENDS;

ALTER TABLE JUVE_BBS
MODIFY JB_BBS_HITS DEFAULT 0;

ALTER TABLE JUVE_BBS
MODIFY JB_BBS_RECOMMENDS DEFAULT 0;

ALTER TABLE JUVE_BBS
MODIFY JB_BBS_ISPUBLIC DEFAULT 'Y';

ALTER TABLE JUVE_BBS
RENAME COLUMN JB_BBS_WRITER TO JB_BBS_WRITER_NAME;

ALTER TABLE JUVE_BBS
ADD JB_BBS_WRITER_ID varchar2(16 char);

ALTER TABLE JUVE_BBS
ADD CONSTRAINT BBS_ID
FOREIGN KEY (JB_BBS_WRITER_ID) REFERENCES JUVE_MEMBER(JM_ID);

SELECT * from juve_bbs;


CREATE TABLE JUVE_BBS_PHOTO(
JBP_PHOTO_NAME varchar2(200 char) PRIMARY KEY,
JBP_ID varchar2(16 char) NOT NULL,
JBP_BBS_NO number(6) NOT NULL,
CONSTRAINT BBS_PHOTO_NO
		FOREIGN KEY(JBP_BBS_NO) REFERENCES JUVE_BBS(JB_NO)
		ON DELETE cascade
);

SELECT  * FROM JUVE_BBS_PHOTO;

CREATE TABLE JUVE_ORDER_CART(
JOC_NO number(6) NOT NULL,
JOC_ID varchar2(16 char) NOT NULL,
JOC_PRODUCTCODE varchar2(7 char) NOT NULL,
JOC_SDRVALUE varchar2(100 char),
JOC_SMTVALUE varchar2(100 char),
JOC_SSTVALUE varchar2(100 char),
JOC_SSMVALUE varchar2(100 char),
JOC_WMTVALUE varchar2(100 char),
JOC_WSTVALUE varchar2(100 char),
JOC_AMOUNT NUMBER(5) NOT NULL,
JOC_TOTALPRICE number(7) NOT NULL,
JOC_REGDATE DATE NOT NULL,
CONSTRAINT CART_ID
FOREIGN KEY (JOC_ID) REFERENCES JUVE_MEMBER(JM_ID)
ON DELETE CASCADE,
CONSTRAINT CART_PRODUCTCODE
FOREIGN KEY (JOC_PRODUCTCODE) REFERENCES JUVE_PRODUCT(JP_PRODUCTCODE)
ON DELETE cascade
);

ALTER TABLE JUVE_ORDER_CART
MODIFY JOC_SDRVALUE varchar2(1000 char);

ALTER TABLE JUVE_ORDER_CART
MODIFY JOC_SMTVALUE varchar2(1000 char);

ALTER TABLE JUVE_ORDER_CART
MODIFY JOC_SSTVALUE varchar2(1000 char);

ALTER TABLE JUVE_ORDER_CART
MODIFY JOC_SSMVALUE varchar2(1000 char);

ALTER TABLE JUVE_ORDER_CART
MODIFY JOC_WMTVALUE varchar2(1000 char);

ALTER TABLE JUVE_ORDER_CART
MODIFY JOC_WSTVALUE varchar2(1000 char);

CREATE SEQUENCE JUVE_ORDER_CART_SEQ;

-- 기존 테이블 변경: JOC_PRODUCTNAME -> JOC_PRODUCTCODE


SELECT * FROM juve_order_cart;
DELETE FROM JUVE_ORDER_CART;



-- 추천 테이블 생성
CREATE TABLE JUVE_PRODUCT_RECOMMENDATION (
    JPR_NO NUMBER(7) PRIMARY KEY,
    JPR_ID VARCHAR2(16) REFERENCES JUVE_MEMBER(JM_ID),
    JPR_AGE NUMBER,
    JPR_GENDER CHAR(1),
    JPR_PRODUCTCODE VARCHAR2(7) REFERENCES JUVE_PRODUCT(JP_PRODUCTCODE),
    JPR_SCORE NUMBER DEFAULT 0 NOT NULL,
    CONSTRAINT FK_RECOMMENDATION_MEMBER FOREIGN KEY (JPR_ID) REFERENCES JUVE_MEMBER(JM_ID) ON DELETE CASCADE,
    CONSTRAINT FK_RECOMMENDATION_PRODUCT FOREIGN KEY (JPR_PRODUCTCODE) REFERENCES JUVE_PRODUCT(JP_PRODUCTCODE) ON DELETE CASCADE
);

CREATE SEQUENCE JPR_SEQ;

SELECT * FROM JUVE_PRODUCT_RECOMMENDATION;
DELETE FROM JUVE_PRODUCT_RECOMMENDATION;

CREATE OR REPLACE TRIGGER TRG_UPDATE_GENDER_AGE_RECOMM
AFTER UPDATE ON JUVE_MEMBER
FOR EACH ROW
BEGIN
    -- 추천 테이블의 성별 및 나이 업데이트
    UPDATE JUVE_PRODUCT_RECOMMENDATION
    SET JPR_GENDER = :NEW.JM_GENDER,
        JPR_AGE = :NEW.JM_AGE
    WHERE JPR_ID = :NEW.JM_ID;
END;
/

CREATE TABLE JUVE_ORDER(
JO_NO number(7) PRIMARY KEY,
JO_ID varchar2(16),
JO_SENDER varchar2(4 char) NOT null,
JO_SENDER_ADDRESS varchar2(100 char) NOT NULL,
JO_SENDER_PHONE varchar2(13 char) NOT NULL,
JO_SENDER_TEL varchar2(14 char),
JO_SENDER_EMAIL varchar2(50 char) NOT NULL,
JO_DESTINATON varchar2(30 char) NOT NULL,
JO_RECIPIENT varchar2(4 char) NOT NULL,
JO_RECIPIENT_ADDRESS varchar2(100 char) NOT NULL,
JO_RECIPIENT_PHONE varchar2(13 char) NOT NULL,
JO_RECIPIENT_TEL varchar2(14 char),
JO_ORDERSTATUS number(1) NOT NULL,
JO_CARTS varchar2(4000 char) NOT NULL,
JO_MILEAGE number(7),
JO_TOTALCARTPRICE number(8) NOT NULL,
JO_SHIPFEE number(7) NOT NULL,
JO_FINALPRICE number(8) NOT NULL,
JO_MESSAGE varchar2(30 char),
JO_ORDERDATE DATE NOT NULL,
CONSTRAINT FK_JUVE_ORDER_MEMBER FOREIGN KEY (JO_ID) REFERENCES JUVE_MEMBER(JM_ID)
);

DROP TABLE JUVE_ORDER;
CREATE SEQUENCE JUVE_ORDER_SEQ;

SELECT * FROM juve_order;