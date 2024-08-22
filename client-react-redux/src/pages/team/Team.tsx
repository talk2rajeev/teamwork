import React, { useEffect } from 'react';
import { AuthUtil } from '../../utils/auth/auth';
import { useAppSelector, useAppDispatch } from '../../appStore/hooks';
import {
  getAllTeams,
  getTeamsWithUserByTeamId,
  allTeams,
} from '../../slices/team/teamSlice';
import { IoMdEye, IoMdCreate } from 'react-icons/io';

const Team: React.FC = () => {
  const dispatch = useAppDispatch();
  const teams = useAppSelector(allTeams);

  const userDetail = AuthUtil.getUserDetail();
  const isAdmin = userDetail?.roleId && userDetail?.roleId === 1;

  useEffect(() => {
    dispatch(getAllTeams());
  }, []);

  console.log('teams ', teams);

  const viewTeamDetail = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {};

  const updateTeam = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {};

  return (
    <div>
      {isAdmin && <div>Create Team</div>}
      {teams.status === 'loading' ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <div className="container bg-white p-4">
            <div className="grid grid-cols-3 gap-4 border-gray-200 border-b-1">
              <div className="pt-2 pb-2 font-semibold">Team Name</div>
              <div className="pt-2 pb-2 font-semibold">Team owner</div>
              <div className="pt-2 pb-2 font-semibold">Action</div>
            </div>
            {teams.teams.map((t) => (
              <div
                key={t.team_id}
                className="grid grid-cols-3 gap-4 border-gray-200 border-b-1"
              >
                <div className="pt-2 pb-2">{t.team_name}</div>
                <div className="pt-2 pb-2">
                  {t.created_by_fname} {t.created_by_lname}
                </div>
                <div className="pt-2 pb-2  ">
                  <div className="flex gap-3">
                    <span
                      onClick={viewTeamDetail}
                      data-action="view"
                      data-prodid={t.team_id}
                    >
                      <IoMdEye
                        size="16"
                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                      />
                    </span>
                    {userDetail?.profileId === t.created_by_profile_id ||
                    isAdmin ? (
                      <span
                        onClick={updateTeam}
                        data-action="edit"
                        data-prodid={t.team_id}
                      >
                        <IoMdCreate
                          size="16"
                          className="cursor-pointer text-gray-500 hover:text-gray-700"
                        />
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
