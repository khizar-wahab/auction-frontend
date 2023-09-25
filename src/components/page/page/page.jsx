import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../../config'
import { useParams } from 'react-router-dom';


export default function Page() {
    const params = useParams();
    const [pageData, setPageData] = useState(null);

    const getData = () => {
        const endpoint = BASE_URL + `/page/${params.slug}`;
        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPageData(data.data);
                console.log("page k data ", data.data)
            })
            .catch(error => {
                console.error('Failed:', error);
            });
    }
    useEffect(() => {
        getData();
    }, [params.slug]);
    return (
        <div className='container'>
            <h1 className='inner-banner-title'>{pageData?.title}</h1>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">Home</li>
                    <li className="breadcrumb-item active" aria-current="page">{pageData?.title}</li>
                </ol>
            </nav>
            <div dangerouslySetInnerHTML={{ __html: pageData?.content }} />
        </div>

    )
}
