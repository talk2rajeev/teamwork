import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NavItems, NavItemType, EPICS, SPRINT } from '../../../utils/constants';
import { Popover } from 'antd';
import SprintSearchDropdown from '../../widgets/sprintSearchDropdown/SprintSearchDropdown';
// import { useAppSelector, useAppDispatch } from '../../app/hooks';
// import { selectCount } from '../../features/counter/counterSlice';
import { RootState } from '../../../appStore/store';
import * as Types from '../../../utils/types/types';
import { setSessionStorage, getSessionStorage } from '../../../utils/storage';

const getMenuWithChild = (item: NavItemType) => {
  switch (item.label) {
    case EPICS:
      return (
        <Popover
          placement="topRight"
          content={getEpicMenu(item?.children || [])}
          trigger="click"
        >
          <span className="leading-5 text-gray-500 cursor-pointer">
            {item.label}
          </span>
        </Popover>
      );
    case SPRINT:
      return (
        <Popover
          placement="topRight"
          content={<GetSprintMenu />}
          trigger="click"
        >
          <div>
            <span className="leading-5 text-gray-500 cursor-pointer">
              {item.label}
            </span>
          </div>
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

const GetSprintMenu: React.FC = () => {
  const navigate = useNavigate();
  // TODO:
  //   Get last opened product(localStorage) > sprint
  //   if (no last product in localstorage)  >>  take all the projects > select first project
  const onSprintSelect = (sprint: Types.Sprint) => {
    console.log('Selected Sprint ', sprint);
    navigate(`/${sprint.productId}/sprint/${sprint.sprintId}`);
    setSessionStorage('recentSprint', JSON.stringify(sprint));
  };

  const recentSprint = getSessionStorage('recentSprint');
  const sprint = recentSprint ? JSON.parse(recentSprint) : {};

  return (
    <div>
      <div>
        <SprintSearchDropdown onSprintSelect={onSprintSelect} />
      </div>
      {recentSprint ? (
        <NavLink
          to={`/${sprint.productId}/sprint/${sprint.sprintId}`}
          className="block pt-1 pb-1 mt-2"
        >
          Recently Viewed Sprint
        </NavLink>
      ) : null}
    </div>
  );
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
