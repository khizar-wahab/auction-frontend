import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../../config';
import { useRef } from 'react';

function FaqWrap() {
  const [data, setData] = useState([]);

  const getData = () => {
    const endpoint = import.meta.env.APP_API_BASE_URL + '/faqs';
    fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data.data);
      })
      .catch(error => {
        console.error('Failed:', error);
      });
  }

  useEffect(() => {
    getData();
  }, []);
  const [successMsg, setSuccessMsg] = useState();
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.APP_API_BASE_URL + '/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success == true) {
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
          });
          setSuccessMsg(data.message)
        }
      } else {

      }
    } catch (error) {
      console.error('Data not sent:', error);
      formRef.current.elements[0].focus();
    }
  };
  return (
    <>
      <div className="faq-section pt-120 pb-120">
        <div className="container">
          <div className="row d-flex justify-content-center gy-5">
            <div className="col-lg-4 col-md-12 order-lg-1 order-2">
              <div className="faq-form-area wow fadeInDown" data-wow-duration="1.5s" data-wow-delay=".2s">
                <h5>Ask Any Question?</h5>
                <p className="para">Your email address will not be published. Required fields are marked *</p>
                <form className="faq-form" onSubmit={handleSubmit}>
                  <div className="form-inner">
                    <label>Your Full Name *</label>
                    <input type="text" placeholder="Enter your name" name='name' onChange={handleInputChange} value={formData.name}  />
                  </div>
                  <div className="form-inner">
                    <label>Your Email *</label>
                    <input type="text" placeholder="Enter your email" name='email' onChange={handleInputChange} value={formData.email} />
                  </div>
                  <div className="form-inner">
                    <label>Subject *</label>
                    <input type="text" placeholder="Subject" name='subject' onChange={handleInputChange} value={formData.subject}  />
                  </div>
                  <div className="form-inner">
                    <label>Your Message *</label>
                    <textarea placeholder="Your message" rows={5} defaultValue={""}  onChange={handleInputChange} />
                  </div>
                  <div to={"#"} className="eg-btn btn--primary btn--md mt-1" onClick={handleSubmit}>Send Now</div>
                  {
                      successMsg ?
                        <span className='text-success mt-3 mb-0'>{successMsg}</span>
                        :
                        ''
                    }
                </form>
              </div>
            </div>
            <div className="col-lg-8 col-md-12 text-center order-lg-2 order-1">
              <h2 className="section-title3">General FAQ’s</h2>
              <div className="faq-wrap wow fadeInUp" data-wow-duration="1.5s" data-wow-delay=".2s">
                <div className="accordion" id="accordionExample">
                  {data.map((item) => (
                    <div key={item.id} className="accordion-item">
                      <h2 className="accordion-header" id={`heading${item.id}`}>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${item.id}`} aria-expanded="true" aria-controls={`collapse${item.id}`}>
                          {item.question}
                        </button>
                      </h2>
                      <div id={`collapse${item.id}`} className="accordion-collapse collapse" aria-labelledby={`heading${item.id}`} data-bs-parent="#accordionExample">
                        <div className="accordion-body" dangerouslySetInnerHTML={{__html: item.answer}}>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FaqWrap