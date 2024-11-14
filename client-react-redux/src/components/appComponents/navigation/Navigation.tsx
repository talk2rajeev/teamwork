import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavItems, NavItemType, EPICS, SPRINT } from '../../../utils/constants';
import { Popover } from 'antd';
// import { useAppSelector, useAppDispatch } from '../../app/hooks';
// import { selectCount } from '../../features/counter/counterSlice';
import { RootState } from '../../../appStore/store';

const getMenuWithChild = (item: NavItemType) => {
  switch (item.label) {
    case EPICS:
      return (
        <Popover
          placement="topRight"
          content={getEpicMenu(item?.children || [])}
          trigger="click"
        >
          <span className="text-gray-500 cursor-pointer">{item.label}</span>
        </Popover>
      );
    case SPRINT:
      return (
        <Popover placement="topRight" content={getSprintMenu()} trigger="click">
          <span className="text-gray-500 cursor-pointer">{item.label}</span>
        </Popover>
      );
    default:
      return null;
  }
};

const getEpicMenu = (childMenu: Array<{ path: string; label: string }>) => {
  return (
    <div>
      {childMenu.map((c, index) => (
        <div key={index}>
          <NavLink to={c.path} className="block pt-1 pb-1">
            {c.label}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

const getSprintMenu = () => {
  return <div>This is sprint menu 1</div>;
};

const Navigation: React.FC = () => {
  // const count = useAppSelector(selectCount);
  const count = useSelector((state: RootState) => state.counter);
  const isActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'text-blue-500 font-medium' : 'text-gray-500';
  return (
    <ul className="flex space-x-4">
      {NavItems.map((item) => {
        const isSprintBoardPath = item.path.includes('sprint');
        const path = !isSprintBoardPath
          ? item.path
          : item.path.replace('productId', '12345');
        return (
          <div key={item.path}>
            {
              //   item.children && item.label === EPICS ? (
              //   <Popover
              //     placement="topRight"
              //     content={getEpicMenu(item.children)}
              //   >
              //     <span className="text-gray-500 cursor-pointer">
              //       {item.label}
              //     </span>
              //   </Popover>
              // )
              item.children ? (
                getMenuWithChild(item)
              ) : (
                <li className="text-sm">
                  <NavLink to={path} className={isActive}>
                    {item.label}
                  </NavLink>
                </li>
              )
            }
          </div>
        );
      })}
    </ul>
  );
};

export default Navigation;
