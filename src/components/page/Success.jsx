import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';

function Success() {
  useEffect(() => {
    document.title = "Payment";
  }, []);
  return (
    <div style={{ margin:"6rem" }}>
      <div className="container text-center">
          <h2 className='inner-banner-title wow text-dark mt-5'>Payment Success</h2>
          <nav aria-label="breadcrumb">
              <ol className="breadcrumb d-flex justify-content-center">
                  <li className="breadcrumb-item active text-dark" aria-current="page">Payment successfully processed. Thank you for your payment!</li>
              </ol>
          </nav>
      </div>
    </div>
  )
}

export default Success