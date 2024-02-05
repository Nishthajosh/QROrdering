import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import QRCode  from 'qrcode';
import QrReader from 'react-qr-scanner'
import { useRef, useState } from 'react';
import './styles/qrBack.css';
import ScanMenu from '../src/ScanMenu.gif';


import axios from 'axios';
import { QRAPI_URL } from "./helper"


function Qr() {
  const qrRef = useRef();
  const [scanresult, setScanresult] = useState('');

  const handleErrorfile = (error) => {
    alert('There is a technical error');
    console.log(error);
  };

  const handleScanfile = async (result) => {
    if (result) {
      setScanresult(result.text);
      if (result.text === 'Table_1') {
        try {
          const response = await axios.post(`${QRAPI_URL}/feedback/add`, {
            tableid: result.text,
          });
  
          console.log(response.data, 'userData');
          alert('Scanned');
          console.log('matched');
  
          // Check if the Axios POST request was successful
          if (response.status === 200) {
            alert('Scanned successfully');
            window.location.href = 'https://scaneat-final.netlify.app/';
          } else {
            alert('Failed to scan. Please try again.');
          }
        } catch (err) {
          console.log('ERROR:' + err);
          alert('Failed to scan. Please try again.');
        }
      } else {
        alert('Not Scanned');
        alert('Please scan the correct QR code');
      }
      console.log(result);
    }
  };
  

  return (
    <div className="main" >
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            <h1 style={{color:"white"}} >Instructions to scan the QR code</h1>
            <h2 style={{color:"white"}}>Step 1:</h2>
            <p style={{color: "antiquewhite"}}>Scan the placed QR code by any of the application from your device</p>
            <h2 style={{color:"white"}}>Step 2:</h2>
            <p style={{color: "antiquewhite"}}>Login by entering your correct details</p>
            <h2 style={{color:"white"}}>Step 3:</h2>
            <p style={{color: "antiquewhite"}}>You will be redirected to the Digital menu</p>
            <h2 style={{color:"white"}}>Step 4:</h2>
            <p style={{color: "antiquewhite"}}>Checkout to pay,Once all ordering is done </p>
          </div>

          <div className="col-lg-6 col-md-6 col-12">
            <QrReader
              ref={qrRef}
              delay={300}
              style={{ width: '100%' }}
              onError={handleErrorfile}
              onScan={handleScanfile}
            />
            <h3>
              Get scanned code: <a href={scanresult}>{scanresult}</a>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Qr;
