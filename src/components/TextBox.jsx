function TextBox({ id, header, value, onChange, placeholder }) {
  return (
    <label className="field" htmlFor={id}>
      <span>{header}</span>
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  )
}

export default TextBox
