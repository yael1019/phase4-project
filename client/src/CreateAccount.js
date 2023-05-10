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
        handleCreateAccount(form)
        setForm({
            name: '',
            username: '',
            password: ''
        })
        navigate('/')
    }

  return (
    <div>
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