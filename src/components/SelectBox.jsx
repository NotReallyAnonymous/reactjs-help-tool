function SelectBox({ id, header, value, onChange, options }) {
  return (
    <label className="field" htmlFor={id}>
      <span>{header}</span>
      <select id={id} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

export default SelectBox
