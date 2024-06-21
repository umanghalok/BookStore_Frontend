// Import necessary components and functions from @mui/material
import { Box, TextField, Button, styled, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { DataContext } from '../../context/DataProvider.jsx';
import {userLogin} from '../../services/userService.js';


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
const LoginButton = styled(Button)`
    text-transform: none;                // Disable text transformation
    background: #445045;                 // Set background color
    color: #fff;                         // Set text color
    height: 48px;                        // Set fixed height
    border-radius: 2px;                  // Change border radius, reduce it to 2px. By default, it is 4px ig
`;

// Create a styled component for the signup button
const SignupButton = styled(Button)`
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

// Define the Login component
const Login = ({isUserAuthenticated}) => {
    const navigate = useNavigate(); 

    const LoginInitialValues={
        username:'',
        password:''
    }
    const [login,setLogin]=useState(LoginInitialValues);
    const[error, setError]=useState('');

    const {setAccount} = useContext(DataContext);


    const onInputChange=(e)=>{
        setLogin({...login, [e.target.name]:e.target.value});//for appending using spread
    }

    const toLogin=()=>{
        navigate('/signup');
    }

    const loginUser=async()=>{
        try{
            let response= await userLogin(login);
            if(response.status===200){
                setError('');
                setLogin(LoginInitialValues);
                sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`);
                sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
                setAccount({username: response.data.username, name:response.data.name})
                isUserAuthenticated(true);
                navigate('/');
            }
            else{
                setError('Something went wrong! Please try again!');
            }
        }
        catch(err)
        {
            console.log('Error while logging in.');
        }
    }

    return (
        <Root>
            <Component>
                <Box>
                    <Wrapper>
                        <TextField variant='standard' label='Enter the Username' name='username' onChange={(e)=>onInputChange(e)} /> {/* Username input */}
                        <TextField type='password' variant='standard' label='Enter your Password' name='password' onChange={(e)=>onInputChange(e)} /> {/* Password input */}
                        {error && <Error>{error}</Error> }
                        <LoginButton onClick={()=>loginUser()} variant='contained'>Login</LoginButton> {/* Login button */}
                        <Text>Don't have an account?</Text> {/* Signup prompt text */}
                        <SignupButton onClick={()=>toLogin()}>Create an account</SignupButton> {/* Signup button */}
                    </Wrapper>
                </Box>
            </Component>
        </Root>
    );
}

// Export the Login component as the default export
export default Login;
