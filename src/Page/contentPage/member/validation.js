function contains(input, set) {
  for (let i = 0; i < set.length; i++) {
    if (input.indexOf(set[i]) !== -1) {
      /*alert("please includ " + set);*/
      return false;
    }
  }
  return true;
}

export const validateId = (id) => {
  // DB에서 받아올 id list - 이 list에 있는 id와 가입 id가 같으면 중복체크
  const idList = ["test1111", "test2222"];

  // id로 쓸 수 있는 문자만 변수에 지정
  const ok =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_@.0123456789";
  if (id.length === 0) {
    return { msg: "아이디를 입력해주세요", validation: false };
  }

  if (id.length < 4) {
    return { msg: "아이디가 4자보다 짧습니다", validation: false };
  }

  if (!isNaN(id[0])) {
    return {
      msg: "공백/숫자로 시작 또는 공백/숫자로만 구성된 아이디는 사용하실 수 없습니다.",
      validation: false,
    };
  }

  for (let i = 0; i < id.length; i++) {
    if (ok.indexOf(id[i]) === -1) {
      return {
        msg: "한글, 공백, 특수문자는 사용하실 수 없습니다. ('-','_' 제외)",
        validation: false,
      };
    }
  }

  if (idList.includes(id)) {
    return { msg: "이미 존재하는 아이디 입니다.", validation: false };
  }

  return { msg: `${id}는 사용 가능한 아이디 입니다`, validation: true };
};

export const validatePw = (password, passwodConfirmInput) => {
  if (password !== passwodConfirmInput) {
    return { msg: "비밀번호가 일치하지 않습니다.", validation: false };
  }

  if (passwodConfirmInput.length < 10) {
    return { msg: "비밀번호가 10자보다 짧습니다.", validation: false };
  }

  if (!contains(passwodConfirmInput, " ")) {
    return { msg: "비밀번호는 공백을 포함할 수 없습니다.", validation: false };
  }

  if (
    (contains(passwodConfirmInput, "1234567890") ||
      contains(passwodConfirmInput, "abcdefghijklmnopqrstuvwxyz") ||
      contains(passwodConfirmInput, "ABCDEFGHIJKLMNOPQRSTUVWXYZ")) &&
    (contains(passwodConfirmInput, "~`!@#$%^&*()_-={}[];:<>,.?/") ||
      contains(passwodConfirmInput, "abcdefghijklmnopqrstuvwxyz") ||
      contains(passwodConfirmInput, "ABCDEFGHIJKLMNOPQRSTUVWXYZ"))
  ) {
    return {
      msg: "비밀번호는 대소문자 + 숫자/특수문자의 조합이어야 합니다. ※사용가능 특수문자 ~`!@#$%^&*()_-={}[];:<>,.?/ ",
      validation: false,
    };
  }

  return { msg: "사용가능한 비밀번호입니다.", validation: true };
};

export const validateAll = (isAllValidate) => {
  if (!isAllValidate.id) {
    return { msg: "올바르지 않은 아이디 입니다", validation: false };
  }
  if (!isAllValidate.password) {
    return { msg: "올바르지 않은 비밀번호 입니다", validation: false };
  }
  if (!isAllValidate.name) {
    return { msg: "이름을 입력해주세요.", validation: false };
  }
  if (!isAllValidate.address) {
    return { msg: "주소를 입력해주세요.", validation: false };
  }
  if (!isAllValidate.phone) {
    return { msg: "휴대폰 번호를 입력해주세요", validation: false };
  }
  if (!isAllValidate.email) {
    return { msg: "올바르지 않은 이메일 입니다.", validation: false };
  }
  if (!isAllValidate.terms) {
    return { msg: "모든 약관을 동의해 주세요", validation: false };
  }
  return { msg: "가입 성공", validation: true };
};

export const validateEmail = (email) => {
  const emailList = ["test1111@naver.com", "test2222@gmail.com"];
  const regex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  if (email.length === 0) {
    return { msg: "이메일을 입력해주세요.", validation: false };
  }

  if (!contains(email, " ")) {
    return { msg: "이메일은 공백을 포함할 수 없습니다.", validation: false };
  }
  if (!regex.test(email)) {
    return { msg: "올바르지 않은 이메일 형식입니다.", validation: false };
  }
  if (emailList.includes(email)) {
    return { msg: "이미 사용중인 이메일 입니다.", validation: false };
  }

  return { msg: "사용가능한 이메일 입니다.", validation: true };
};
