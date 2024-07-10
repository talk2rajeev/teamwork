import React from 'react';

type propsType = {
  label?: string;
  type: string;
  placeholder?: string;
  name: string;
  value?: string | number;
  onchange: (event: React.ChangeEvent<HTMLInputElement>, data?: any) => void;
  disabled?: boolean;
  required?: boolean;
  dataAttribute?: string;
  data?: any;
  error?: string;
  classes?: string;
};
const Input = ({
  label,
  type,
  placeholder,
  name,
  value,
  onchange,
  disabled,
  required,
  dataAttribute,
  data,
  error,
  classes,
}: propsType) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    onchange(event, data);
  };
  const inputclasses = `text-slate-700 text-xs w-full p-3 bg-gray-100 ${classes}`;
  return (
    <>
      {label ? (
        <div className="text-xs w-full text-slate-700 mb-2">
          {label}
          {required ? <span className="text-red-400">*</span> : ''}
        </div>
      ) : (
        ''
      )}
      <input
        data-attr={dataAttribute}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChangeHandler}
        disabled={disabled}
        className={inputclasses}
      />
      {error ? (
        <div className="text-xss w-full text-red-500 p-1 break-all">
          {error}
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default Input;
