import React from 'react';
import { AuthUtil } from '../../utils/auth/auth';

const Team: React.FC = () => {
  const userDetail = AuthUtil.getUserDetail();
  const isAdmin = userDetail?.roleId && userDetail?.roleId === 1;
  return (
    <div>
      {isAdmin && <div>Create Team</div>}
      <h2>Team list</h2>
    </div>
  );
};

export default Team;
