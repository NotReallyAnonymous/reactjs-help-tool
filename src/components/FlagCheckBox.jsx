function FlagCheckBox({ id, header, flag, checked, onChange }) {
  return (
    <label className="field field--checkbox" htmlFor={id}>
      <span>{header}</span>
      <div className="checkbox-row">
        <input id={id} type="checkbox" checked={checked} onChange={onChange} />
        <span className="checkbox-flag">{flag}</span>
      </div>
    </label>
  )
}

export default FlagCheckBox
