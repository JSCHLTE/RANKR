import "./close.css"

export default function Close ({ onClick, className = '', style = {} }) {
    <div onClick={onClick} style={style} className={className}>
        <i className="fa-solid fa-x"></i>
    </div>
}