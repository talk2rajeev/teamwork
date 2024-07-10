import React from 'react';

type menuLinkProps = {
  label: string;
  active?: boolean;
  onclick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
};

const MenuLink = ({ label, active, onclick }: menuLinkProps) => {
  const classes = active
    ? 'text-sky-400 underline underline-offset-17'
    : 'text-gray-400';
  return (
    <span
      data-item={label}
      onClick={onclick}
      className={`leading-8 hover:text-sky-400 hover:cursor-pointer  ${classes}`}
    >
      {label}
    </span>
  );
};

export default MenuLink;
