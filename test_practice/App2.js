import React, { useState } from 'react'
import { apiCall } from '../api';

const App2 = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        error: false, message: ''
    });
 
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true);
        const url = 'http://localhost:8000/account/login';
        let response; 
        try {
            response = await apiCall(url, 'post', {
                username, password
            }, {});   
               
            setLoading((pre) => false)       
            console.info(response.data) 
            if (!response) {
                setError((pre) => {
                    return { 
                        error: true, message: "Network Error"
                    }
                })
            } else {
                if (response.data.login === 'success') {
                    setError((pre) => {
                        return { error: false, message: 'login success' }
                    })
                } else {
                    setError((pre) => {
                        return { error: true, message: 'login failed' }
                    })
                }
            }
         
        } catch (error) {
            setLoading(false);
            setError((pre) => {
                return {
                    error: true, message: "Network Error"
                }
            })
        }
    }


    return (
        <div> 
            <form>
                <input type={'text'} onChange={(e) => { setUsername(e.target.value) }} value={username} placeholder='username' />
                <input type={'password'} onChange={(e) => { setPassword(e.target.value) }} value={password} placeholder='password' />
                <button disabled={!username || !password}
                    onClick={handleSubmit}
                >
                    {
                        loading ? 'please wait...' : 'Login'
                    }

                </button>
                <h6 data-testid='message' >
                    {
                        error ? error.message : error.message
                    }
                </h6>
            </form>
        </div>
    ) 
}

export default App2;