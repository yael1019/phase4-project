import React, { useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser'

function Write({ currentUser, articles, setArticles }) {
    const [text, setText] = useState('')
    const [form, setForm] = useState({
        title: '',
        text: '',
        user_id: '',
        category_id: ''
    })

    function handleChange(e){
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        let joined;
        if(Array.isArray(parse(text))) {
            const arr = parse(text)
            const strings = arr.map(str => str.props.children)
            joined = strings.join('\n')
        }
        fetch('/articles', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            },
            body: JSON.stringify({
                ...form,
                user_id: currentUser.id,
                text: joined
            })
        })
        .then(res => res.json())
        .then(data => setArticles([...articles, data]))
        setForm({
            title: '',
            text: '',
            user_id: '',
            category_id: ''
        })
        setText('')
        window.location.reload(false)
    }
    return (
        <div>
            <form className='editor' onSubmit={handleSubmit}>
                <input name='title' type='text' placeholder='Enter title' value={form.title} onChange={handleChange}/>
                {/* <label for='category'>Choose a Category</label> */}
                <select name='category_id' id='category' value={form.category_id} onChange={handleChange}>
                    <option value='all'>Choose a Category</option>
                    <option value='1'>Travel</option>
                    <option value='2'>Cooking</option>
                    <option value='3'>Sports</option>
                    <option value='4'>Tech</option>
                    <option value='5'>Money</option>
                    <option value='6'>Business</option>
                </select>
                <CKEditor
                    editor={ClassicEditor}
                    data={text}
                    onChange={(vent, editor) => {
                        const data = editor.getData()
                        setText(data)
                    }}
                    name='text'
                />
                <button>Publish</button>
            </form>
            {/* <div>
                <h2>Content</h2>
                <p>{parse(text)}</p>
            </div> */}
        </div>
    )
}

export default Write