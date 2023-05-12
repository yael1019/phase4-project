import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login({handleLogin}) {
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate()

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        handleLogin(form)
        setForm({
            username: '',
            password: ''
        })
    }

  return (
    <div className='login-form'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input name='username' type='text' placeholder='Enter username' value={ form.username } onChange={ handleChange }/>
            <input name='password' type='password' placeholder='Enter password' value={form.password} onChange={ handleChange }/>
            <input type='submit'/>
        </form>
        <button id='create-acct-btn' onClick={() => navigate('/createAccount')}>Create an account</button>
    </div>
  )
}

export default Login