import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword, name }),
      });

      if (response.ok) {
        alert("회원가입 완료");

        // Use navigate function to navigate to the '/signin' route
        navigate("/signin");
      } else {
        // 회원가입 실패 로직을 여기에 추가
        console.error('Sign up failed');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form>
        <label>
          email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <label>
          ConfirmPassword:
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </label>
        <br/>
        <label>
          name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br/>
        <button type="button" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
