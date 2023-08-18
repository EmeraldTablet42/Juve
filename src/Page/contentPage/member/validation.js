export const validateId = (id) => {
  // DB에서 받아올 id list - 이 list에 있는 id와 가입 id가 같으면 중복체크
  const idList = ["test1111", "test2222"];

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
    return "공배/숫자로 시작 또는 공백/숫자로만 구성된 아이디는 사용하실 수 없습니다.";
  }

  for (let i = 0; i < id.length; i++) {
    if (ok.indexOf(id[i]) === -1) {
      return "한글, 공백, 특수문자는 사용하실 수 없습니다. ('-','_' 제외)";
    }
  }

  if (idList.includes(id)) {
    return "이미 존재하는 아이디 입니다.";
  }

  return `${id}는 사용 가능한 아이디 입니다`;
};

export const validatePw = (password, passwodConfirmInput) => {

  function contains(input, set) {
    for (let i = 0; i < set.length; i++) {
      if (input.indexOf(set[i]) !== -1) {
        /*alert("please includ " + set);*/
        return false;
      }
    }
    return true;
    
  }

  if (password!==passwodConfirmInput) {
    return "비밀번호가 일치하지 않습니다.";
  }

  if(passwodConfirmInput.length<10){
    return "비밀번호가 10자보다 짧습니다.";
  }

  if(!contains(passwodConfirmInput," ")){
    return "비밀번호는 공백을 포함할 수 없습니다."
  }

  if(
    (contains(passwodConfirmInput,"1234567890")||
    contains(passwodConfirmInput,"abcdefghijklmnopqrstuvwxyz")||
    contains(passwodConfirmInput,"ABCDEFGHIJKLMNOPQRSTUVWXYZ"))
    &&
    (contains(passwodConfirmInput,"~`!@#$%^&*()_-={}[];:<>,.?/")||
    contains(passwodConfirmInput,"abcdefghijklmnopqrstuvwxyz")||
    contains(passwodConfirmInput,"ABCDEFGHIJKLMNOPQRSTUVWXYZ"))
    ){
    return "비밀번호는 대소문자 + 숫자/특수문자의 조합이어야 합니다. ※사용가능 특수문자 ~`!@#$%^&*()_-={}[];:<>,.?/ ";
  }

  return "사용가능한 비밀번호입니다."
};
