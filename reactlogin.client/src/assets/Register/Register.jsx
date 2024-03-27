/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import './Register.css';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import * as React from 'react';
import axios from 'axios';

function Register() {
    const [Username, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    const handleUsernameChange = (value) => { setUsername(value); }
    const handleEmailChange = (value) => { setEmail(value); }
    const handlePasswordChange = (value) => { setPassword(value); }
    const handleConfirmPasswordChange = (value) => { setConfirmPassword(value); }
    const handleSave = () => {
        const data = {
            username: Username,
            email: Email,
            password: Password,
            conpassword: ConfirmPassword
        };
        const url = 'https://localhost:7179/api/Login/Register';
        axios.post(url, data).then((result) => {
            alert(result.data)
        }).catch((error) => {
            alert(error);
        })
    };

    return (
        <div className="wrapper">
            <h1>Register</h1>
            <div className="input-box">
                <input type="text" placeholder="Username" required onChange={(e) => handleUsernameChange(e.target.value)} />
                <FaUser className="icon" />
            </div>
            <div className="input-box">
                <input type="email" placeholder="Email" required onChange={(e) => handleEmailChange(e.target.value)} />
                <MdEmail className="icon" />
            </div>
            <div className="input-box">
                <input type="password" placeholder="Password" required onChange={(e) => handlePasswordChange(e.target.value)} />
                <FaLock className="icon" />
            </div>
            <div className="input-box">
                <input type="password" placeholder="ConfirmPassword" required onChange={(e) => handleConfirmPasswordChange(e.target.value)} />
                <FaLock className="icon" />
            </div>

            <div className="remember">
                <label><input type="checkbox" /> Remember me </label>
            </div>

            <button type="submit" onClick={() => handleSave()}>Register</button>
        </div>
    );
}
export default Register;