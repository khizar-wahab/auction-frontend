// import React from 'react'
// import { Link } from 'react-router-dom'

// function Breadcrumb(props) {
//   return (
//     <>
//      <div className="inner-banner">
//         <div className="container">
//           <h2 className="inner-banner-title wow fadeInLeft" data-wow-duration="1.5s" data-wow-delay=".2s">{props.pageName}</h2>
//           <nav aria-label="breadcrumb">
//             <ol className="breadcrumb">
//               <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
//               <li className="breadcrumb-item active" aria-current="page">{props.pageTitle}</li>
//             </ol>
//           </nav>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Breadcrumb



import React from 'react'
import { Link } from 'react-router-dom';

const Breadcrumb = (props) => {
    return (
        <>
            <div className="container text-center">
                <h2 className='inner-banner-title wow text-dark mt-5'>{props.pageName}</h2>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb d-flex justify-content-center">
                        <li className="breadcrumb-item"><Link to={"/"}>Home</Link></li>
                        <li className="breadcrumb-item active text-dark" aria-current="page">{props.pageTitle}</li>
                    </ol>
                </nav>
            </div>
        </>
    )
}

export default Breadcrumb
