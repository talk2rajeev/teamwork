import React from 'react';
import Navigation from '../navigation/Navigation';
import { Logo } from '../logo/Logo';
import { AuthUtil } from '../../../utils/auth/auth';
import Popover from '../../popover/popover';

function PageHeader() {
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
  };

  const Settings = (
    <div>
      <p data-item="settings" onClick={settingOnclick}>
        Settings
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
          <Popover content={Settings}>
            {userDetail?.fname} {userDetail?.lname}
          </Popover>
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
