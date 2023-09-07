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
    <div className="fullpage">
      <div className="resignPasswordCheck-wrapper">
        <div className="check-box">
          <div className="check-text">
            <h2>회원 탈퇴</h2>
          </div>
          <div className="check-pw">
            <p>{auth.memberId}님의 회원정보를 안전하게 보호하기 위해</p>
            <p>비밀번호를 한번 더 확인해 주세요.</p>
            <div className="password-box">
              <label>비밀번호 : </label>
              <input
                name="passwordConfirm"
                value={password}
                type="password"
                onChange={handlePassword}
              />
            </div>
            <div className="check-button">
              <button
                className="reverse-button"
                style={{ width: '200px', height: '50px' }}
                onClick={resinMember}
              >
                탈퇴
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resign;
