import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../../config';

export default function ForgetPassword() {
    const[mail,setMail]=useState(null);
    const [success,setSuccess]=useState(null);
    const [error, setError]=useState(null);
    const [loading, setLoading] = useState(false);

    const sendEmail = ()=>{
        if (!mail) {
            setError("Please enter your email address");
            return;
        } else {
            setError(null);
        }

        setLoading(true);

        const endPoint = BASE_URL + '/forget-password';
        fetch(endPoint, {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                email :mail
            })})
          .then((response) => {
            if (!response.ok) {
                setLoading(false);
                setError("Failed to send email");
                throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            setLoading(false);
            if (data.status) {
                setSuccess(data.message);
                setError(null);
            } else {
                setError(data.message);
            }
          })
          .catch((error) => {
            setLoading(false);
            setError("Failed to send email");
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
                                <h3>Forgot Password</h3>
                                {/* <p>Forgotten Password? <Link to={`/signup`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} >reset here</Link></p> */}
                            </div>
                            {error && (
                                <p className="text-danger">{error}</p>
                            )}
                            {success && (
                                <p className="text-success">{success}</p>
                            )}
                            <form className="w-100" >
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-inner">
                                            <label>Enter Your Email *</label>
                                            <input type="email" onChange={(e)=>setMail(e.target.value)} placeholder="Enter Your Email" name='email'  />
                                        </div>
                                    </div>
                                </div>
                                <button type='button' className="account-btn" onClick={()=>sendEmail()}>
                                    {!loading? 'Send Email': 'Sending...'}
                                </button>
                            </form>

                            {/* <div className="form-poicy-area " >
                                <p>By clicking the "submit" button, you create your password, and you agree to Our's <Link to={"#"}>Terms &amp; Conditions</Link> &amp; <Link to={"#"}>Privacy Policy.</Link></p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
