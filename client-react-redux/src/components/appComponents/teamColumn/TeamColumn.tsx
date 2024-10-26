import React from 'react';
import { Space, Tooltip, TableProps } from 'antd';
import * as Types from '../../../utils/types/types';
import { IoMdEye, IoMdCreate } from 'react-icons/io';

export const getTeamColumns = (
  viewTeamDetail: (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => void,
  updateTeam: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
): TableProps<Types.Team>['columns'] => [
  {
    title: 'Team Name',
    dataIndex: 'team_name',
    key: 'team_name',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Team Created By',
    dataIndex: 'created_by',
    key: 'created_by',
    render: (text) => <span>{text}</span>,
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, team) => (
      <Space size="middle">
        <span
          data-action="view"
          data-teamid={team.team_id}
          onClick={viewTeamDetail}
        >
          <IoMdEye
            size="16"
            className="cursor-pointer text-gray-500 hover:text-gray-700"
          />
        </span>
        <span
          data-action="edit"
          data-teamid={team.team_id}
          onClick={updateTeam}
        >
          <Tooltip title="Update Team, Add user to Team" placement="right">
            <IoMdCreate
              size="16"
              className="cursor-pointer text-gray-500 hover:text-gray-700"
            />
          </Tooltip>
        </span>
      </Space>
    ),
  },
];
