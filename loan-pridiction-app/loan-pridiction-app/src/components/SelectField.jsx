

export  const SelectField = ({ label, name, value, onChange, options }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
  