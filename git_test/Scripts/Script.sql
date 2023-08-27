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


DROP TABLE JUVE_PRODUCT;

--DELETE FROM JUVE_PRODUCT;

SELECT * FROM juve_product;


