import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItems } from '../../utils/constants';

const Navigation: React.FC = () => {
    const isActive = ({ isActive }: {isActive: boolean}) => (isActive ? 'text-blue-500 font-medium' : 'text-gray-500');
  return (
    <ul className="flex space-x-4">
        {
            NavItems.map(item => {
                return <li className='text-sm' key={item.label}>
                    <NavLink 
                        to={item.path}
                        className={isActive}
                    >{item.label}</NavLink>
                </li>
            })
        }
    </ul>
  );
};

export default Navigation;