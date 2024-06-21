// Import necessary components and functions from @mui/material
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {userSignup} from '../../services/userService.js';

// Create a styled component for the root container with full height and centered content
const Root = styled(Box)`
    background-color: #9ED5CB;   // Set background color
    height: 100vh;              // Full viewport height
    display: flex;              // Use flexbox for layout
    align-items: center;        // Center items vertically
    justify-content: center;    // Center items horizontally
`;

// Create a styled component for the main box container
const Component = styled(Box)`
    width: 400px;                        // Set fixed width
    margin: auto;                        // Center horizontally
    box-shadow: 5px 2px 5px 2px rgb(68 80 69/ 60%);  // Add shadow TRBL rgb(a,b,c/ opacity)
    margin-top: 150px;                    // Add top margin
    background-color: white;             // Set background color to white or else the root color will be applied
`;


// Create a styled component for the wrapper around the form elements
const Wrapper = styled(Box)`
    padding: 25px 35px;                  // Add padding(vertical,horizontal)
    display: flex;                       // Use flexbox for layout
    flex-direction: column;              // Arrange children in a column
    & > div, & > button, & > p {         // Apply styles to child elements present inside this Wrapper 
        margin-top: 20px;                // Add top margin to each child
    }
`;

// Create a styled component for the login button
const SignupButton = styled(Button)`
    text-transform: none;                // Disable text transformation
    background: #445045;                 // Set background color
    color: #fff;                         // Set text color
    height: 48px;                        // Set fixed height
    border-radius: 2px;                  // Change border radius, reduce it to 2px. By default, it is 4px ig
`;

// Create a styled component for the signup button
const LoginButton = styled(Button)`
    text-transform: none;                // Disable text transformation(so that it is not in uppercase)
    background: #fff;                    // Set background color
    color: #2874F0;                      // Set text color
    height: 48px;                        // Set fixed height
    border-radius: 2px;                  // Change border radius
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%); // Add shadow
`;

// Create a styled component for the text element
const Text = styled(Typography)`
    color: #878787;                      // Set text color
    text-align: center;                  // Center text
`;

const Error = styled(Typography)`
    color: #ff6161;                      // Set text color
    text-align: center;                  // Center text
    margin-top: 10px;
    font-weight: 600;
`;


// Define the Signup component
const Signup = () => { 
    const navigate = useNavigate();   
    const SignupInitialValues={
        name:'',
        username:'',
        password:''
    }

    const [signup,setSignup]=useState(SignupInitialValues);
    const[error, setError]=useState('');

    const onInputChange=(e)=>{
        setSignup({...signup, [e.target.name]:e.target.value});
    }

    const signupUser=async()=>{
        try{
            let response= await userSignup(signup);
            //console.log(response.status===200);
            if(response.status===200){
                setError('');
                setSignup(SignupInitialValues);
                navigate('/login');
            }
            else{
                setError('Something went wrong! Please try again!');
            }
        }
        catch(err)
        {
            console.log('Error while signing up.');
        }
    }
    const toLogin=()=>{
        navigate('/login');
    }
    return (
        <Root>
            <Component>
                <Box>
                    <Wrapper>
                        <TextField variant='standard' label='Enter your Name' name='name' onChange={(e)=>onInputChange(e)}/> {/* Username input */}
                        <TextField variant='standard' label='Enter the Username' name='username' onChange={(e)=>onInputChange(e)}/> {/* Username input */}
                        <TextField type='password' variant='standard' name='password' label='Enter your Password' onChange={(e)=>onInputChange(e)}/> {/* Password input */}
                        {error && <Error>{error}</Error> }
                        <SignupButton onClick={()=>signupUser()} variant='contained'>Create an account</SignupButton> {/* Login button */}
                        <Text>Already have an account?</Text> {/* Signup prompt text */}
                        <LoginButton onClick={()=>toLogin()}>Login</LoginButton> {/* Signup button */}
                    </Wrapper>
                </Box>
            </Component>
        </Root>
    );
}

// Export the Login component as the default export
export default Signup;
