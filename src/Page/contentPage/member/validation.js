export const validateId = (id) => {

// DB에서 받아올 id list - 이 list에 있는 id와 가입 id가 같으면 중복체크
const idList = ["test1111","test2222"]

// id로 쓸 수 있는 문자만 변수에 지정
  const ok =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_@.0123456789";
  if (id.length === 0) {
    return "아이디를 입력해주세요";
  }
  
  if (id.length < 4) {
    return "아이디가 4자보다 짧습니다";
  }
  
  if (!isNaN(id[0])) {
    return "숫자로 시작 또는 숫자로만 구성된 아이디는 사용하실 수 없습니다.";
  }
  
  for (let i = 0; i < id.length; i++) {
    if (ok.indexOf(id[i]) === -1) {
      return "한글, 공백, 특수문자는 사용하실 수 없습니다. ('-','_' 제외)";
    }
  }
  
  if(idList.includes(id)){
    return "이미 존재하는 아이디 입니다.";
  }

  return `${id}는 사용 가능한 아이디 입니다`;
};
