export default function Button({label, onClick, width, height, font}) {
    return <button className={`risque block mx-auto rounded-[15px] my-10 ${width} ${height} ${font} bg-secondary text-default`} onClick={onClick} >{label}</button>;
}