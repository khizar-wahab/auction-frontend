import React, { useEffect, useState } from 'react'
import { Link,useNavigate   } from 'react-router-dom'

import {BASE_URL} from '../../../config'
function SignUpWrap() {
  const [openEye, setOpenEye]= useState();
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate ();
  const [isChecked , setIsChecked] = useState(false);
  const [error, setError] = useState(""); 
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (isLoggedIn) {
      navigate('/');
    }
  }, [history, isLoggedIn]);
  const handleEyeIcon = ()=>{
    if(openEye === false || openEye ===0){
      setOpenEye(1)
    }else{
      setOpenEye(false)
    }
  }

  const handleCheckboxChange = () => {
     setIsChecked(!isChecked);
  }
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!isChecked){
      setError("Please agree to terms and policy.");
      return;
    }
    try {
      const response = await fetch(import.meta.env.APP_API_BASE_URL+'/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if(data.status==true){
          localStorage.setItem('userData', JSON.stringify(data));
          localStorage.setItem('token', data.token);
          localStorage.setItem('isLoggedIn', 'true');
          navigate('/');
        }
      } else {
        const data = await response.json();
        const fieldErrors = {};
        for (const fieldName in data.error) {
          fieldErrors[fieldName] = data.error[fieldName].join(' ');
        }
        setValidationErrors(fieldErrors);
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };
  return (
    <>
     <div className="signup-section pt-120 pb-120">
        <img alt="images" src={'/images/bg/section-bg.png'} className="section-bg-top" />
        <img alt="images" src={'/images/bg/section-bg.png'} className="section-bg-bottom" />
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="form-wrapper wow fadeInUp" data-wow-duration="1.5s" data-wow-delay=".2s">
                <div className="form-title">
                  <h3>Sign Up</h3>
                  <p>Do you already have an account? <Link to={`/login`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Log in here</Link></p>
                </div>
                <form className="w-100" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>First Name *</label>
                        <input type="text" placeholder="Frist Name" name='first_name' value={formData.first_name} onChange={handleInputChange}/>
                        {validationErrors.first_name && (
                          <p className="text-danger">{validationErrors.first_name}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Last Name *</label>
                        <input type="text" placeholder="Last Name" name='last_name' value={formData.last_name} onChange={handleInputChange} />
                        {validationErrors.last_name && (
                          <p className="text-danger">{validationErrors.last_name}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <label>Enter Your Email *</label>
                        <input type="email" placeholder="Enter Your Email" name='email' value={formData.email} onChange={handleInputChange} />
                        
                        {validationErrors.email && (
                          <p className="text-danger">{validationErrors.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-inner">
                        <label>Password *</label>
                        <input type={openEye === 1 ? "password" : "text"} name="password" id="password" placeholder="Create A Password" value={formData.password} onChange={handleInputChange}  />
                        <i className={openEye === 1 ? "bi bi-eye-slash": "bi bi-eye-slash bi-eye"} onClick={handleEyeIcon} id="togglePassword" />
                        {validationErrors.password && (
                          <p className="text-danger">{validationErrors.password}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                        <div className="form-group">
                          <input type="checkbox" id="agreeToTerms" name="agreeToTerms" checked={isChecked} onChange={handleCheckboxChange}/>
                          <label htmlFor="agreeToTerms">I agree to the Terms &amp; Policy</label>
                          {error && <div className="text-danger">{error}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="account-btn">Create Account</button>
                </form>
                {/* <div className="alternate-signup-box">
                  <h6>or signup WITH</h6>
                  <div className="btn-group gap-4">
                    <Link to={"#"} className="eg-btn google-btn d-flex align-items-center"><i className="bx bxl-google" /><span>signup whit google</span></Link>
                    <Link to={"#"} className="eg-btn facebook-btn d-flex align-items-center"><i className="bx bxl-facebook" />signup whit facebook</Link>
                  </div>
                </div> */}
                <div className="form-poicy-area">
                  <p>By clicking the "signup" button, you create a Cobiro account, and you agree to Cobiro's <Link to={"#"}>Terms &amp; Conditions</Link> &amp; <Link to={"#"}>Privacy Policy.</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>   
    </>
  )
}

export default SignUpWrap