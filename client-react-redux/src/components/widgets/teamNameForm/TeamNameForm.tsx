import React, { FC, useState } from 'react';
import { Button, Input, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

interface TeamNameFormProps {
  defaultValue?: string;
  onSubmit: (value: string) => void;
  onCancel: () => void;
  type: 'Create' | 'Update';
}

const TeamNameForm: FC<TeamNameFormProps> = ({
  defaultValue,
  onSubmit,
  onCancel,
  type,
}) => {
  const [teamName, setTeamName] = useState<string>();

  const onTeamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  const submit = () => {
    if (teamName) {
      onSubmit(teamName);
    }
  };

  return (
    <div className="grid grid-cols-12 auto-cols-max justify-between gap-3 w-full transition duration-150 ease-out">
      <div className="col-span-10">
        <label>Team Name</label>
        <Input
          placeholder="Team name"
          defaultValue={defaultValue}
          onChange={onTeamNameChange}
          size="middle"
        />
      </div>
      <div className="flex items-end col-span-2">
        <Tooltip title={`${type} Team name`} placement="top">
          <Button
            type="primary"
            icon={<CheckOutlined style={{ color: '#FFF' }} />}
            size="middle"
            onClick={submit}
            disabled={!teamName}
          />
        </Tooltip>
        &nbsp;
        <Tooltip title="Cancel" placement="top">
          <Button icon={<CloseOutlined color="#0099ff" />} onClick={onCancel} />
        </Tooltip>
      </div>
    </div>
  );
};

export default TeamNameForm;
