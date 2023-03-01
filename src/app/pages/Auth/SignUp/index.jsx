import React from 'react'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap'

import AuthHeader from '../Components/AuthHeader';
import '../auth.scss'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
    const navigate = useNavigate()
    return (
        <div className='auth-main-wrap'>
            <AuthHeader />
            <Form className='mt-40'>
                <Form.Group className="mb-4">
                    <Form.Label className='auth-label'>First Name</Form.Label>
                    <Form.Control className=' p-2 auth-input-wrap'  type="text" placeholder="Enter First Name" />  
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label className='auth-label'>Last Name</Form.Label>
                    <Form.Control className=' p-2 auth-input-wrap'  type="text" placeholder="Enter Last Name" />  
                </Form.Group>

              
                <div  className='d-flex flex-column align-items-center justify-content-center mt-40 '>
                    
                   <p className='tnc-text'>
                   By clicking Agree & Join, you agree to MusicMate’s
                   <span> User Agreement, Privacy Policy, & Cookie Policy. 
                   </span>
                   </p>
                    <Button className='primary-btn' type="submit" onClick={()=>navigate('/welcome')}>
                    Agree & Join
                </Button>
                </div>
                
            </Form>
        </div>
    )
}
export default SignUp