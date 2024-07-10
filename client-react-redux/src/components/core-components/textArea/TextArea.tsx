import React from 'react';

type propsType = {
  label?: string;
  rows?: number;
  placeholder?: string;
  name: string;
  value?: string;
  onchange: (event: React.ChangeEvent<HTMLTextAreaElement>, data?: any) => void;
  disabled?: boolean;
  required?: boolean;
  dataAttribute?: string;
  data?: any;
  error?: string;
  classes?: string;
};
const TextArea = ({
  label,
  rows,
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
  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onchange(event, data);
  };
  const inputclasses = `text-slate-700 text-xs w-full p-3 bg-gray-100 ${classes}`;
  return (
    <>
      {label ? (
        <span className="text-xs w-full text-slate-700">
          {label}
          {required ? <span className="text-red-400">*</span> : ''}
        </span>
      ) : (
        ''
      )}
      <textarea
        data-attr={dataAttribute}
        rows={rows ? rows : 3}
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

export default TextArea;
