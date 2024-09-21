import React, {useState} from 'react';
import axios from 'axios';
import {toJsonString} from 'curlconverter'


const CurlInputForm: React.FC = () => {
    const [curlCommand, setCurlCommand] = useState('');
    const [message, setMessage] = useState('');

    const handleCurlSubmit  = async  (e:React.FormEvent) => {
    e.preventDefault();

    const parsedCurl = JSON.parse(toJsonString(curlCommand));

    try{
        const response = await axios.post('/api/upload-curl', parsedCurl);
        setMessage('cURL command uploaded successfully');

    }catch(error){
        setMessage('Error uploading cURL command')
    }

   }
    return (
      <div>
        <h2>Upload cURL Command</h2>
        <form onSubmit={handleCurlSubmit}>
          <textarea
            value={curlCommand}
            onChange={(e) => setCurlCommand(e.target.value)}
            placeholder="Enter cURL command here"
            rows={6}
            cols={50}
          />
          <button type='submit'>Submit</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    )

};

export default CurlInputForm;