import React, {useEffect} from 'react'
import { Link } from 'react-router-dom';

function Cancel() {
  useEffect(() => {
    document.title = "Payment";
  }, []);
  return (
    <div style={{ margin:"6rem" }}>
      <div className="container text-center">
          <h2 className='inner-banner-title wow text-dark mt-5'>Payment Failed</h2>
          <nav aria-label="breadcrumb">
              <ol className="breadcrumb d-flex justify-content-center">
                  <li className="breadcrumb-item active text-dark" aria-current="page">Payment unsuccessfful. Please try again or contact support.</li>
              </ol>
          </nav>
      </div>
    </div>
  )
}

export default Cancel