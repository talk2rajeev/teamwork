import React from 'react';
import { Spinner } from '../icons/Icons';

type buttonType = 'primary' | 'default' | 'success' | 'warning' | 'error';
type propsType = {
  label: string;
  type: buttonType;
  clickHandler: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data?: any
  ) => void;
  disabled?: boolean;
  dataAttribute?: string;
  data?: any;
  loading?: boolean;
};
// const colorsMap = {
//     primary: 'blue',
//     default: 'gray',
//     success: 'green',
//     warning: 'orange',
//     error: 'red',
// }
const cssClassMap = {
  primary: `text-white bg-blue-500 hover:bg-blue-600 active:bg-blue-700`,
  default: `text-slate-700 bg-gray-300 hover:bg-gray-400 active:bg-gray-500`,
  success: `text-white bg-green-500 hover:bg-green-600 active:bg-green-700`,
  warning: `text-white bg-orange-500 hover:bg-orange-600 active:bg-orange-700`,
  error: `text-white bg-red-500 hover:bg-red-600 active:bg-red-700`,
};
const Button = ({
  label,
  type,
  clickHandler,
  disabled,
  dataAttribute,
  data,
  loading,
}: propsType) => {
  const onclick = (event: React.MouseEvent<HTMLButtonElement>) => {
    clickHandler(event, data);
  };

  let buttonClasses = `rounded-sm text-xs w-full p-3 transform transition duration-300 ease-in-out  ${cssClassMap[type]} ${disabled ? 'disabled:opacity-50' : ''}`;

  const buttonTextContent = loading ? (
    <span className="flex justify-center items-center">
      <Spinner />
      {label}
    </span>
  ) : (
    label
  );

  return dataAttribute ? (
    <button
      data-attr={dataAttribute}
      onClick={onclick}
      className={buttonClasses}
      disabled={disabled}
    >
      {buttonTextContent}
    </button>
  ) : (
    <button onClick={onclick} className={buttonClasses} disabled={disabled}>
      {buttonTextContent}
    </button>
  );
};

export default Button;
