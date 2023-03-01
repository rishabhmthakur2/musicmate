import React from 'react'
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap'

import AuthHeader from '../Components/AuthHeader';
import '../auth.scss'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate()
    return (
        <div className='auth-main-wrap'>
            <AuthHeader title={' Join MusicMate'} />
            <Form className='mt-40'>
                <Form.Group className="mb-4">
                    <Form.Label className='auth-label'>Email</Form.Label>
                    <Form.Control className=' p-2 auth-input-wrap'  type="email" placeholder="Enter email" />  
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label className='auth-label'>Password</Form.Label>
                    <Form.Control  className=' p-2 auth-input-wrap' type="password" placeholder="Password" />
                    <Form.Text className="text-muted">
                    8 or more characters
        </Form.Text>
                </Form.Group>
                <div  className='d-flex flex-column align-items-center justify-content-center mt-40 '>
                    
                   
                    <Button className='primary-btn' type="submit" onClick={()=>navigate('/welcome')}>
                    Submit
                </Button>
                </div>
                
            </Form>
        </div>
    )
}
export default Login