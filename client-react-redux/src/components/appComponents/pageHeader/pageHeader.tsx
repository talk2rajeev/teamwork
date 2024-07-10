import React from 'react';
import Navigation from '../navigation/Navigation';
import { Logo } from '../logo/Logo';

function PageHeader() {
  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const target = event.target as HTMLSpanElement;
    console.log('menu clicked ', target.dataset.item);
  };
  return (
    <header className="grid grid-cols-3 gap-4">
      <Logo />
      <div className="col-span-2 justify-self-end">
        <div className="grid grid-flow-col auto-cols-max gap-6 pt-2">
          {/* <MenuLink onclick={handleMenuItemClick} label='Dashboard' active={true}/> 
                    <MenuLink onclick={handleMenuItemClick} label='Projects'/> 
                    <MenuLink onclick={handleMenuItemClick} label='Sprints'/> 
                    <MenuLink onclick={handleMenuItemClick} label='Backlogs'/> 
                    <MenuLink onclick={handleMenuItemClick} label='Epics'/>  */}
          <Navigation />
        </div>
      </div>
    </header>
  );
}

export default PageHeader;
