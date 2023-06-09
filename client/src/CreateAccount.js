import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CreateAccount.css'

function CreateAccount({handleCreateAccount}) {
    const [form, setForm] = useState({
        name: '',
        username: '',
        password: ''
    })
    const navigate = useNavigate()

    function handleChange(e){
        setForm({
            ...form, 
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        const cap = form.password[0].toUpperCase() + form.password.slice(1)
        if (form.password !== cap || form.password.length < 8) {
            alert('Password must be capitalized and at least 8 characters long')
            return null
        }
        handleCreateAccount(form)
        setForm({
            name: '',
            username: '',
            password: ''
        })
        navigate('/')
    }

return (
    <div className='create-account-form'>
        <h1>Create an Account</h1>
        <form onSubmit={handleSubmit}>
            <input name='name' type='text' placeholder='Enter your full name' value={form.name} onChange={handleChange}/>
            <input name='username' type='text' placeholder='Enter a username' value={form.username} onChange={handleChange}/>
            <input name='password' type='password' placeholder='Enter a password' value={form.password} onChange={handleChange}/>
            <input type='submit' />
        </form>
    </div>
)
}

export default CreateAccount
