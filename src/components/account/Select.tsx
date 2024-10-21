interface Option {
    id: string;
    name: string;
}

interface Select {
    name: string;
    label: string;
    options: Option[];
    error?: string;
    handleSelect: (name: string, value: string) => void;
    handleName: (name: string, value: string) => void;
}

export default function Select({ name, handleName, handleSelect, label, options, error }: Select) {

    function handleChange(name: string, id: string) {
        const foundOption = options.find((option) => option.id === id)
        const value = foundOption?.name;
        handleSelect(name, id);
        handleName(name, value!);
    }

    return (
        <div className="form-control">
            <label className="label">
                <span className="">{label}</span>
            </label>
            <select onChange={(e) => handleChange(name, e.target.value)} defaultValue={`Pilih ${label}`} name={name} disabled={options.length === 0} className="input input-bordered" >
                <option disabled>Pilih {label}</option>
                {options.map((option, index) => (
                    <option key={index} value={option.id}>{option.name}</option>
                ))}
            </select>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}