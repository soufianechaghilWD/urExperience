export default function LabelAndInputs({type, value, onChange, placeholder, label}) {
    return <div className="flex flex-col mb-4">
        <label>{label}</label>
        <input className="border-[0.2px] bg-primary p-1" type={type} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
}