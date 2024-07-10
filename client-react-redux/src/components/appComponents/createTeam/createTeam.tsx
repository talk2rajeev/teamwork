import react, { useState } from 'react';
import axios from 'axios';
import * as coreComponents from '../../core-components';

type CreateTeamProps = {};

const CreateTeam: React.FC<CreateTeamProps> = () => {
  // TODO: create team

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

  return (
    <div className="user-story-container bg-white p-2">
      <div className="p-2 mb-4">
        <coreComponents.Input
          label="Product Name"
          type="text"
          name="title"
          placeholder="Product name"
          onchange={onInputChange}
          classes="text-base bg-white border-1 border-slate-300 outline-slate-400"
        />
      </div>

      <div className="mb-2">
        <div>
          <coreComponents.Button
            label="Submit"
            type="primary"
            clickHandler={handleSubmit}
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
