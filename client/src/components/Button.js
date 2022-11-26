export default function Button({label, onClick, width, height, font, disabled, className}) {
    return <button className={`${className ? className : ""} risque block rounded-[15px] my-10 ${width} ${height} ${font} bg-secondary text-default`} onClick={onClick} disabled={disabled} >{label}</button>;
}