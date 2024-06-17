import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItems } from '../../../utils/constants';
// import { useAppSelector, useAppDispatch } from '../../app/hooks';
// import { selectCount } from '../../features/counter/counterSlice';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../appStore/store';

const Navigation: React.FC = () => {
    // const count = useAppSelector(selectCount);
    const count = useSelector((state: RootState) => state.counter)
    console.log('count', count.value);
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