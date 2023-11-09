import React, { useEffect, useState } from "react";
import './privacy.css'
import { ReactSession } from 'react-client-session';
import { 
  useParams
} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid'; 
import Post from "../Post/Post"; 
import Footer from '../Footer/Footer';
import Profile from "../Profile/Profile";
import Box from '@mui/material/Box';
var axios = require('axios'); 

function Privacy() { 

  return (
    <>
    <Grid container spacing={2}> 
      <Grid style={{alignContent: "center", flexDirection: "row", justifyContent: "center", margin: "100px", marginTop: "100px"}}  spacing={2}  item xs={12}>
        <h1>Secutiry And Privacy</h1>
        <p ><b>1. Data Collection</b></p>
            <p >
              We collect limited personal information, solely for the purpose of providing our services and
              improving user experience.
            </p>
            <p ><b>2. Data Usage</b></p>
            <p >
              We use the information you provide to deliver services, respond to
              inquiries, and improve our app. We do not share your personal data
              with third parties.
            </p>
            <p ><b>3. Data Security</b></p>
            <p >
              We take security seriously and employ industry-standard measures
              to protect your data from unauthorized access or disclosure.
            </p>
            <p ><b>4. Cookies</b></p>
            <p >
              We use cookies to enhance user experience. Cookies are small text
              files stored on your device. You can control cookie settings in
              your browser.
            </p>
            <p ><b>5. Consent</b></p>
            <p >
              By using our app, you consent to the data practices described in
              this policy. You may choose not to provide personal information or
              opt-out of data collection (refer to Section 6).
            </p>
            <p ><b>6. User Control and Opt-Out</b></p>
            <p >
              You can access, update, or delete your personal information by
              contacting us. We will assist you in doing so. If you wish to
              opt-out of data collection, please contact us.
            </p>
            <p ><b>7. Data Retention</b></p>
            <p >
              We retain user data for as long as it's necessary for the purposes
              outlined in this policy or as required by law.
            </p>
            <p ><b>8. Children's Privacy</b></p>
            <p >
              Our app is not intended for children under 13. If you believe we
              have collected information from a child, please contact us, and we
              will promptly remove it.
            </p>
            <p ><b>9. Third-Party Services</b></p>
            <p >
              Our app may Not use third-party services.
            </p>
            <p><b>10. Changes to this Policy</b></p>
            <p >
              We may update this policy to reflect changes in our data
              practices. Any significant changes will be notified to users.
            </p>
            <p > <b>11. Contact Us</b></p>
            <p >
             If you have any questions or concerns about our privacy and data
              practices, please contact us at Email: andoyonlinestore@gmail.com.
            </p>
      </Grid> 

    </Grid> 
    </>
  )
}

export default Privacy;
