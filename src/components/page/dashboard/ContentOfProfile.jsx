import React, { useState } from 'react'
import {BASE_URL} from '../../../config'
import { useEffect } from 'react';
function ContentOfProfile() {
  const [openEye, setOpenEye]= useState();
  const [success, setSuccess]= useState();
  const [validationErrors, setValidationErrors] = useState({});
  const handleEyeIcon = ()=>{
    if(openEye === false || openEye ===0){
      setOpenEye(1)
    }else{
      setOpenEye(false)
    }
  }
  const token = localStorage.getItem('token');
  const userDataJSON = localStorage.getItem('userData');
  const userData = JSON.parse(userDataJSON);
  
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    console.log(imageFile)
    setFormData(prev=>({...prev, image:imageFile}));
  };
    const [formData, setFormData] = useState({
      first_name: userData?userData.first_name:'',
      last_name: userData?userData.last_name:'',
      contact_no: userData?userData.contact_no:'',
      email: userData?userData.email:'',
      address: userData?userData.address:'',
      city: userData?userData.city:'',
      state: userData?userData.state:'',
      zipcode: userData?userData.zipcode:'',
      country: userData?userData.country:'',
      password: '',
      password_confirmation: '',
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

    try {
      const data=new FormData();
      data.append('first_name',formData.first_name)
      data.append('last_name',formData.last_name)
      data.append('contact_no',formData.contact_no)
      data.append('email',formData.email)
      data.append('address',formData.address)
      data.append('city',formData.city)
      data.append('state',formData.state)
      data.append('zipcode',formData.zipcode)
      data.append('country',formData.country)
      data.append('password',formData.password)
      data.append('password_confirmation',formData.password_confirmation)
      data.append('image',formData.image)
      const response = await fetch(import.meta.env.APP_API_BASE_URL+'/profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      });

      if (response.ok) {
        const data = await response.json();
        if(data.status==true){
          localStorage.setItem('userData', JSON.stringify(data.data));
          setSuccess('Profile updated successfully')
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(import.meta.env.APP_API_BASE_URL + '/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setFormData(
          {
            first_name: data.data.first_name && data.data.first_name !== 'null'? data.data.first_name: '',
            last_name: data.data.last_name && data.data.last_name !== 'null'? data.data.last_name: '',
            contact_no: data.data.contact_no && data.data.contact_no !== 'null'? data.data.contact_no: '',
            email: data.data.email && data.data.email !== 'null'? data.data.email: '',
            address: data.data.address && data.data.address !== 'null'? data.data.address: '',
            city: data.data.city && data.data.city !== 'null'? data.data.city: '',
            state: data.data.state && data.data.state !== 'null'? data.data.state: '',
            zipcode: data.data.zipcode && data.data.zipcode !== 'null'? data.data.zipcode: '',
            country: data.data.country && data.data.country !== 'null'? data.data.country: '',
            password: '',
            password_confirmation: '',
          }
        )
      })
      .catch(error => {
        console.error('Failed:', error);
      });
  }, []);

  return (
    <>
        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
        <div className="dashboard-profile">
          <div className="owner">
            <div className="image">
              <img alt="images" src={userData?.image?"/storage/"+userData.image:"/images/bg/profile-pic.png"} />
            </div>
            <div className="content">
              <h3>{formData.first_name?formData.first_name +" ":''}
                {formData.last_name?formData.last_name:''}
              </h3>
              {success?
                <span className='text-success'>{success}</span>
                :
                ''
              }
            </div>
          </div>
          <div className="form-wrapper">
            <form  onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-xl-6 col-lg-12 col-md-6">
                  <div className="form-inner">
                    <label>First Name *</label>
                    <input type="text" placeholder="Your first name" name='first_name' value={formData?.first_name} onChange={handleInputChange} />
                    {validationErrors.first_name && (
                      <p className="text-danger">{validationErrors.first_name}</p>
                    )}
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12 col-md-6">
                  <div className="form-inner">
                    <label>Last Name *</label>
                    <input type="text" placeholder="Your last name" name='last_name' value={formData?.last_name} onChange={handleInputChange}/>
                    {validationErrors.last_name && (
                      <p className="text-danger">{validationErrors.last_name}</p>
                    )}
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12 col-md-6">
                  <div className="form-inner">
                    <label>Contact Number</label>
                    <input type="text" placeholder={+8801} name='contact_no' value={formData?.contact_no} onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12 col-md-6">
                  <div className="form-inner">
                    <label>Email</label>
                    <input type="text" placeholder="Your Email" name='email' value={formData?.email} onChange={handleInputChange}/>
                    {validationErrors.email && (
                      <p className="text-danger">{validationErrors.email}</p>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-inner">
                    <label>Image</label>
                    <input type="file" name="image" onChange={handleImageChange}/>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-inner">
                    <label>Address</label>
                    <input type="text" name="address" value={formData?.address} onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12 col-md-6">
                  <div className="form-inner">
                    <label>City</label>
                    <input type="text" name="city" value={formData?.city} onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12 col-md-6">
                  <div className="form-inner">
                    <label>State</label>
                    <input type="text" name="state" value={formData?.state} onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12 col-md-6">
                  <div className="form-inner">
                    <label>Zip Code</label>
                    <input type="text" placeholder="00000" name='zipcode' value={formData?.zipcode} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12 col-md-6">
                  <div className="form-inner">
                    <label>Country</label>
                    <input type="text" name="country" value={formData?.country} onChange={handleInputChange}/>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-inner">
                    <label>Password *</label>
                    <input type={openEye === 1 ? "password": "text"} name="password" id="password" placeholder="Create A Password" onChange={handleInputChange}/>
                    <i className={openEye === 1 ? "bi bi-eye-slash" :"bi bi-eye-slash bi-eye"} id="togglePassword" onClick={handleEyeIcon} />
                    {validationErrors.password && (
                      <p className="text-danger">{validationErrors.password}</p>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-inner mb-0">
                    <label>Confirm Password *</label>
                    <input type={openEye === 1 ? "password": "text"} name="password_confirmation" id="password2" placeholder="Create A Password" onChange={handleInputChange}/>
                    <i className={openEye === 1 ? "bi bi-eye-slash" :"bi bi-eye-slash bi-eye"} onClick={handleEyeIcon} id="togglePassword2" />
                    {validationErrors.password_confirmation && (
                      <p className="text-danger">{validationErrors.password_confirmation}</p>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="button-group">
                    <button type="submit" className="eg-btn profile-btn">Update Profile</button>
                    <button className="eg-btn cancel-btn">Cancel</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
export default ContentOfProfile