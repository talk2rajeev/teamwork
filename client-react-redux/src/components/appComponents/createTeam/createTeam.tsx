import react, { useState } from 'react';
import axios from 'axios';
import { Button, Modal, Input, Tooltip, Select } from 'antd';
import * as Types from '../../../utils/types/types';
import * as coreComponents from '../../core-components';
import TeamUsers from '../teamUsersManagement/teamUsers/TeamUsers';

type CreateTeamProps = {
  showModal: boolean;
  closeModal: () => void;
};

const CreateTeam: React.FC<CreateTeamProps> = ({ showModal, closeModal }) => {
  const [reqPayload, setReqPayload] = useState<string>();

  const onInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    data?: any
  ) => {
    console.log(event.target.name, event.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const requestPaylod = { data: 'null' };
      await axios.post('http://localhost:3000/save-post', requestPaylod);
      console.log(requestPaylod, 'Post saved successfully');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post');
    }
  };

  const deleteUserFromTeam = (
    user: Types.TeamUser,
    selectedTeamIndex: number
  ) => {
    console.log(
      'delete >  userId: ',
      user.user_profile_id,
      'treamId: ',
      selectedTeamIndex
    );
  };

  return (
    <Modal
      title="Team Management"
      open={showModal}
      onCancel={closeModal}
      width={800}
      footer={null}
    >
      <div className="user-story-container bg-white p-2  min-h-80 grid grid-cols-1 content-between">
        <div className="p-2 mb-4">
          <div>
            <coreComponents.Input
              label="Product Name"
              type="text"
              name="title"
              placeholder="Product name"
              onchange={onInputChange}
              classes="text-base bg-white border-1 border-slate-300 outline-slate-400"
            />
          </div>
          <div>
            <TeamUsers
              deleteUser={deleteUserFromTeam}
              teamUsers={[]}
              selectedTeamIndex={-1}
            />
          </div>
        </div>

        <div className="mb-2">
          <div>
            <Button type="default" size="middle">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateTeam;
