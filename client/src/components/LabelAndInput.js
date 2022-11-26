export default function LabelAndInputs({type, value, onChange, placeholder, label, errorField, error}) {
    return <div className="flex flex-col mb-4">
        <label className={`${errorField?.toUpperCase() === label?.toUpperCase() && "text-danger"}`}>{label}</label>
        <input className={`${errorField?.toUpperCase() === label?.toUpperCase() && "border-danger"} border-[0.2px] bg-primary p-1`} type={type} value={value} onChange={onChange} placeholder={placeholder} />
        {
            errorField?.toUpperCase() === label?.toUpperCase() && <label className={`${errorField?.toUpperCase() === label?.toUpperCase() && "text-danger"}`}>{error}</label>
        }
    </div>
}