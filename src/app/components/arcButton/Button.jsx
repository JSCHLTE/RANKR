
import React from 'react'
import "./button.css"
import Link from 'next/link'

const Button = ({ style, onClick, link, text, type }) => {
    if(onClick) return <button className={`arc rounded ${style}`} onClick={onClick}>{text}</button>
    if(link) return <Link className={`arc rounded ${style}`} href={link}>{text}</Link>
    if(type) return <button className={`arc rounded ${style}`} type={type}>{text}</button>
    return <button className={`arc rounded ${style}`}>{text}</button>
}

export default Button