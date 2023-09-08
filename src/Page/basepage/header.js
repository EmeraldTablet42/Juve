import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import juveLogo from '../../img/header/juve_logo.png';
import '../css/header.css';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../contentPage/member/authSlice';
import Cart from '../contentPage/categorypage/cart/cart';
import Helpdropdown from './helpdropdown';
import sampleimage from '../imagefile/carticon.png';
import mypageimage from '../imagefile/mypage.png';
const Header = () => {
  const auth = useSelector((state) => state.authindex);
  const myDispatch = useDispatch();
  const navi = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('loginToken');
    myDispatch(setAuth({ isLogined: false, memberId: '' })); // 로그아웃 상태로 변경
    // window.location.replace("/");
    navi('/');
  };

  return (
    <div className="header">
      <div>
        <Link to="/">
          <img src={juveLogo} alt="juve Logo"></img>
        </Link>
      </div>
      <div className="middle">
        <div className="middle-search">
          <input maxLength={10} placeholder="         키워드 검색"></input>
        </div>
      </div>
      <div className="right">
        <div className="login-id">
          {auth.isLogined && (
            <div className="welcome">{auth.memberId}님 환영합니다.</div>
          )}
        </div>
        <div className="info-full">
          <div className="info-line">
            {!auth.isLogined ? (
              <>
                <div>
                  <button>
                    <Link to="/member/join">회원가입</Link>
                  </button>
                </div>
                <div>
                  <button>
                    <Link to="/member/login">로그인</Link>
                  </button>
                </div>
              </>
            ) : (
              <div>
                <div>
                  <button onClick={handleLogout}>로그아웃</button>
                </div>
              </div>
            )}
            {auth.memberId === 'adminjuve' ? (
              <div>
                <button style={{ width: '110px' }}>
                  <Link to="/admin/order">관리자페이지</Link>
                </button>
              </div>
            ) : (
              <>
                <div style={{ width: '50px' }}>
                  <button>
                    <Link to="/member/mypage/myorder">
                      <img
                        src={mypageimage}
                        alt="마이페이지"
                        style={{
                          width: '50px',
                          height: '50px',
                        }}
                      />
                    </Link>
                  </button>
                </div>
                <div style={{ width: '50px' }}>
                  <button>
                    <Link to="/cart">
                      <img
                        src={sampleimage}
                        alt="장바구니"
                        style={{ width: '40px', height: '40px' }}
                      />
                    </Link>
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="help-line">
            <Helpdropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
