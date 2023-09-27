import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../config';

export default function ResetPassword() {
    const url = new URL(window.location.href);
    const navigate = useNavigate();
    
    const [data, setData] = useState({
        token: url.searchParams.get('token'),
        email: url.searchParams.get('email'),
        password: null,
        password_confirmation: null,
    });

    const [errors, setErrors] = useState({
        password: null,
        password_confirmation: null,
    });
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const storePassword = () => {
        let validated = true;

        if (!data.password) {
            setErrors(prev => ({...prev, password: 'Password is required.'}));
            validated = false;
        }
        else {
            setErrors(prev => ({...prev, password: null}));
        }

        if (!data.password_confirmation) {
            setErrors(prev => ({...prev, password_confirmation: 'Password confirmation is required.'}));
            validated = false;
        }
        else {
            setErrors(prev => ({...prev, password_confirmation: null}));
        }

        if (data.password !== data.password_confirmation) {
            setErrors(prev => ({...prev, password: 'Password confirmation does not match'}));
            validated = false;
        }

        if (! validated) return;
        setErrors(prev => ({...prev, reset: null}));

        setLoading(true);

        const endPoint = import.meta.env.APP_API_BASE_URL + '/change-password';
        fetch(endPoint, {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)})
          .then((response) => {
            if (!response.ok) {
                response.json()
                .then(data => {
                    if (!data.message)
                        throw new Error('Network response was not ok');

                    setErrors(prev => ({...prev, reset: data.message}));  
                    setLoading(false);                  
                })
            }
            return response.json();
          })
          .then((data) => {
            setLoading(false);
            if (data.status) {
                setSuccess(true);
            } else {
                setErrors(prev => ({...prev, reset: data.message}));
            }
          })
          .catch((error) => {
            console.error('Failed:', error);
          });
    }

    return (
        <div className="login-section pt-120 pb-120">
            <img alt="imges" src="assets/images/bg/section-bg.png" className="img-fluid section-bg-top" />
            <img alt="imges" src="assets/images/bg/section-bg.png" className="img-fluid section-bg-bottom" />
            <div className="container">
                <div className="row d-flex justify-content-center g-4">
                    <div className="col-xl-6 col-lg-8 col-md-10">
                        <div className="form-wrapper wow fadeInUp" data-wow-duration="1.5s" data-wow-delay=".2s">
                            <div className="form-title">
                                <h3>Reset Password</h3>
                                <p>Change password for {data.email}</p>
                                {/* <p>Forgotten Password? <Link to={`/signup`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} >reset here</Link></p> */}
                            </div>
                            {errors.reset && (
                                <p className="text-danger">{errors.reset}</p>
                            )}
                            {success && (
                                <p className="text-success">Password reset successfully. <b><Link to="/login">Click here to Login</Link></b></p>
                            )}
                            <form className="w-100" >
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-inner">
                                            <label>New Password *</label>
                                            <input name="password" id="password" placeholder="Password" onChange={(e) => setData(prev => ({...prev, password: e.target.value}))} />
                                            {errors.password && (
                                                <span className='text-danger'>{errors.password}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-inner">
                                            <label>Confirm New Password *</label>
                                            <input name="password" id="confirm_password" placeholder="Password" onChange={(e) => setData(prev => ({...prev, password_confirmation: e.target.value}))} />
                                            {errors.password_confirmation && (
                                                <span className='text-danger'>{errors.password_confirmation}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button type='button' onClick={() => storePassword()} className="account-btn">{!loading? 'Reset Now': 'Reseting...'}</button>
                            </form>

                            {/* <div className="form-poicy-area " >
                                <p>By clicking the "reset now" button, your password will be reset and you agree to Our's <Link to={"#"}>Terms &amp; Conditions</Link> &amp; <Link to={"#"}>Privacy Policy.</Link></p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
