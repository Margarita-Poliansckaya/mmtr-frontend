import React from 'react'
import {render} from 'react-dom'

function Article(){
    return (
    <div>
        <h1>Hello world</h1>
        <p>hello world</p>
    </div>
    )
}

render(<Article/>, document.getElementById('root'))