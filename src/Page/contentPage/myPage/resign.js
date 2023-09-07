import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuth } from '../member/authSlice';
import './css/resign.css';

const Resign = () => {
  const myDispatch = useDispatch();
  const navi = useNavigate();
  const auth = useSelector((state) => state.authindex);
  const [password, setPassword] = useState('');
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const fd = new FormData();

  fd.append('idToken', sessionStorage.getItem('loginToken'));
  fd.append('password', password);

  const resinMember = async () => {
    if (window.confirm('정말로 탈퇴하시겠습니까?')) {
      await axios
        .post('http://localhost:8090/member.resign', fd)
        .then((res) => {
          if (res.data === 'resign') {
            alert('탈퇴완료');
            sessionStorage.removeItem('loginToken');
            window.location.replace('/');
          } else {
            alert('비밀번호가 올바르지 않습니다.');
          }
        });
    } else {
      navi(-1);
    }
  };

  return (
    <>
      <div>
        <h3>회원 탈퇴</h3>
        <div>
          <p>
            {auth.memberId}님의 회원정보를 안전하게 보호하기 위해
            <br />
            비밀번호를 한번 더 확인해 주세요.
          </p>
          <p>
            <label>비밀번호</label>
            <input
              name="passwordConfirm"
              value={password}
              type="password"
              onChange={handlePassword}
            />
          </p>
          <div>
            <button onClick={resinMember}>탈퇴</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Resign;
