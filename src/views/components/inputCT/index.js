import React from 'react'

const InputCT = (props) => {
  const {label,id, type, placeholder, name,value, onChange} = props;
  return (
    <div className="form-group mx-2">
          <label htmlFor={id} className="fw-bold">{label}</label>
          <input
            type={type}
            className="form-control"
            id={id}
            placeholder={placeholder}
            name={name}
            onChange={onChange}
            value={value}
          />
        </div>
  )
}

export default InputCT