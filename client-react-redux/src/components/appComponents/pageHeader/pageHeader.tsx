import React, { useState } from 'react';
import Navigation from '../navigation/Navigation';
import { Logo } from '../logo/Logo';
import { AuthUtil } from '../../../utils/auth/auth';
import { logout } from '../../../slices/login/loginSlice';
import { useAppDispatch } from '../../../appStore/hooks';
import Popover from '../../popover/popover';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function PageHeader() {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userDetail = AuthUtil.getUserDetail();
  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const target = event.target as HTMLSpanElement;
    console.log('menu clicked ', target.dataset.item);
  };

  const settingOnclick = (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    const targetElement = e.currentTarget as HTMLParagraphElement;
    console.log('data ', targetElement.dataset);
    if (targetElement.dataset.item === 'logout') {
      // Logout
      dispatch(logout());
      navigate('/');
    } else if (targetElement.dataset.item === 'profile') {
      navigate('/profile');
    }
  };

  const settingDropownClass = 'p-2 hover:bg-gray-300 hover:cursor-pointer';

  const Settings = (
    <div className="">
      <p
        className={`${settingDropownClass} rounded-t`}
        data-item="profile"
        onClick={settingOnclick}
      >
        Profile
      </p>
      <p
        className={`${settingDropownClass} rounded-b`}
        data-item="logout"
        onClick={settingOnclick}
      >
        Logout
      </p>
    </div>
  );

  return (
    <header className="grid grid-cols-3 gap-4">
      <Logo />
      <div className="col-span-2 justify-self-end">
        <div className="grid grid-flow-col auto-cols-max gap-6 pt-2">
          <Navigation />
          <Popover content={Settings} position="right-0">
            <div className="flex gap-2 align-middle ml-6 hover:cursor-pointer">
              <FaUserCircle size="18" />
              <span className="hover:text-gray-900">
                {userDetail?.fname} {userDetail?.lname}
              </span>
            </div>
          </Popover>
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
