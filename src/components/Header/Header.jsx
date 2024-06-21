import { AppBar, Toolbar, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/DataProvider";
import { useContext } from "react";

const Component = styled(AppBar)`                  
    background-color: white; 
    color:#000;          
`;

const Container = styled(Toolbar)`                  
    justify-content: center;      
    & > a {     
        padding: 20px;
        color:#000;
        text-decoration: none;
    }
`;

const Button = styled('button')({
    width: '200px',                     // Set fixed width
    display: 'flex',                    // Use flex display
    background: 'white',
    color: 'black',                     // Set text color
    '&:hover': {
        background: 'white',
        color: 'black'
    }
});

const Header = ({isUserAuthenticated,isAuthenticated}) => {
    const { account, setAccount } = useContext(DataContext);
    const handleLogout = () => {
        setAccount(null);
        isUserAuthenticated(false);
        sessionStorage.clear();
    };

    return (
        <Component>
            <Container>
                <Link to='/'>HOME</Link>
                {account&&isAuthenticated ? (
                    <Button onClick={handleLogout}>LOGOUT</Button>
                ) : (
                    <>
                        <Link to='/signup'>SIGNUP</Link>
                        <Link to='/login'>LOGIN</Link>
                    </>
                )}
            </Container>
        </Component>
    );
};

export default Header;
