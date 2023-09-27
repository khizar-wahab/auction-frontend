import React, { useEffect, useState } from 'react'
import { Link,useNavigate  } from 'react-router-dom'
import {BASE_URL} from '../../../config'
function LoginWrap() {
  const [openEye, setOpenEye]= useState();
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedError, setLoggedError] = useState();
  const navigate  = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const handleEyeIcon = ()=>{
    if(openEye === false || openEye ===0){
      setOpenEye(1)
    }else{
      setOpenEye(false)
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    if (isLoggedIn) {
      navigate('/');
    }
  }, [history, isLoggedIn]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleInputChange = (e) => {
    const { name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
      // Check if the checkbox is checked
      if (!isChecked) {
        setLoggedError('Please agree to the terms and policy to login');
        return;
      }
    try {
      const response = await fetch(import.meta.env.APP_API_BASE_URL+'/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if(data.status==true){
          localStorage.setItem('userData', JSON.stringify(data.data));
          localStorage.setItem('token', data.token);
          localStorage.setItem('isLoggedIn', 'true');
          navigate('/');
        }
      } else {
        const data = await response.json();
        const fieldErrors = {};
        if(data.message){
          setLoggedError(data.message)
        }
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
      <div className="login-section pt-120 pb-120">
        <img alt="imges" src="/images/bg/section-bg.png" className="img-fluid section-bg-top" />
        <img alt="imges" src="/images/bg/section-bg.png" className="img-fluid section-bg-bottom" />
        <div className="container">
          <div className="row d-flex justify-content-center g-4">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="form-wrapper wow fadeInUp" data-wow-duration="1.5s" data-wow-delay=".2s">
                <div className="form-title">
                  <h3>Log In</h3>
                  <p>New Member? <Link to={`/signup`} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} >signup here</Link></p>
                </div>
                <form className="w-100" onSubmit={handleSubmit}>
                  <div className="row">
                  { loggedError?<span className='text-danger mb-2'>{loggedError}</span>:'' }
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Enter Your Email *</label>
                        <input type="email" placeholder="Enter Your Email" name='email' value={formData.email} onChange={handleInputChange} />
                        {validationErrors.email && (
                          <p className="text-danger">{validationErrors.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Password *</label>
                        <input type={openEye === 1 ? 'password' : 'text'} name="password" id="password" placeholder="Password" value={formData.password} onChange={handleInputChange}/>
                        <i className={openEye ===1 ?"bi bi-eye-slash": "bi bi-eye-slash bi-eye"} id="togglePassword" onClick={handleEyeIcon} />
                        {validationErrors.password && (
                          <p className="text-danger">{validationErrors.password}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                        <div className="form-group">
                          <input type="checkbox" id="html"  checked={isChecked}
                             onChange={() => setIsChecked(!isChecked)} />
                          <label htmlFor="html">I agree to the <Link to={"#"}>Terms &amp; Policy</Link></label>
                        </div>
                        <Link to={"/forget-password"} className="forgot-pass">Forgotten Password</Link>
                      </div>
                    </div>
                  </div>
                  <button className="account-btn">Log in</button>
                </form>
                {/* <div className="alternate-signup-box">
                  <h6>or signup WITH</h6>
                  <div className="btn-group gap-4">
                    <a href className="eg-btn google-btn d-flex align-items-center"><i className="bx bxl-google" /><span>signup whit google</span></a>
                    <a href className="eg-btn facebook-btn d-flex align-items-center"><i className="bx bxl-facebook" />signup whit facebook</a>
                  </div>
                </div> */}
                <div className="form-poicy-area " >
                  <p>By clicking the "signup" button, you create an account, and you agree to Our's <Link to={"#"}>Terms &amp; Conditions</Link> &amp; <Link to={"#"}>Privacy Policy.</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>   
    </>
  )
}

export default LoginWrap