import React, { useState , useMemo} from 'react';
import styled from 'styled-components';
import Orb from '../Orb/Orb'

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Hardcoded usernames and passwords
    const users = {
        user1: 'password1',
        user2: 'password2',
        user3: 'password3',
        user4: 'password4',
        user5: 'password5',
        user6: 'password6',
        user7: 'password7',
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the username and password match any user
        if (users[username] && users[username] === password) {
            onLogin({ isAuthenticated: true, user: username }); // Pass user information to parent component
        } else {
            alert('Incorrect username or password');
        }
    };

    const orbMemo = useMemo(()=>{
        return <Orb/>
      },[])

    return (
        <LoginStyled>
            {orbMemo}
        <div className='co1-1'>
            <h2 >LOGIN</h2>
            <form onSubmit={handleSubmit} className='form-12'>
                <div className='co1-2'>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='col-3'>
                    <label>Password </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className='btn-submit'>
                <button type="submit">
                    <p>
                    Login
                    </p>
                </button>
                </div>
            </form>
        </div>
        </LoginStyled>
    );
}

const LoginStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
     background: black;
.co1-1{
    
    justify-content: center;
    align-items: center;
    padding: 5rem;

}

h2{
   
    justify-content: center;
    align-items: center;
    padding: 3rem;
    font-size:3rem;
    color : var(--color-cyan) !important;
}
.form-12{

    font-size: 2rem;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border: 2px solid #8a2be2;
    border-radius: 5px;
    padding: 1rem 15rem;
    background: transparent;
    type,input{
    border: 2px solid #8a2be2;
    border-radius: 5px;
    background: white;
    font-size:2rem;
    }
    label{
    padding: 2rem;
    }
   

}
.co1-2{
 
    
    display: flex;
    justify-content: center;
    align-items: center;
     

}
.col-3{
    display: flex;
    justify-content: center;
    align-items: center;

}
.btn-submit{

        
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: inherit;
        font-size: inherit;
        margin:1rem;
        padding: .5rem 1rem;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border: 4px solid ;
        border-radius: 20px;
            &:hover{
                background: var(--color-cyan) !important;
            }
        
}


`;

export default Login;
