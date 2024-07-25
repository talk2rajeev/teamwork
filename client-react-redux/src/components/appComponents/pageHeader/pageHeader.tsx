import React, { useState } from 'react';
import Navigation from '../navigation/Navigation';
import { Logo } from '../logo/Logo';
import { AuthUtil } from '../../../utils/auth/auth';
import { logout } from '../../../slices/login/loginSlice';
import { useAppDispatch } from '../../../appStore/hooks';
import Popover from '../../popover/popover';
import { FaUserCircle } from 'react-icons/fa';
import { redirect } from 'react-router-dom';

function PageHeader() {
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
      redirect('/');
    } else if (targetElement.dataset.item === 'profile') {
    }
  };

  const Settings = (
    <div>
      <p data-item="profile" onClick={settingOnclick}>
        Profile
      </p>
      <p data-item="logout" onClick={settingOnclick}>
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
          <Popover content={Settings} position="right-2">
            <div className="flex gap-2 align-middle ml-6">
              <FaUserCircle size="18" />
              <span>
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
