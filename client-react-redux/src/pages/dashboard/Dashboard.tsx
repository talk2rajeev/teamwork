import React, {useState} from 'react';
import Layout from '../../components/layout/Layout';
import CreateStory from '../../components/appComponents/createStory/CreateStory';
import Modal from '../../components/modal/Modal';
import Popover from '../../components/popover/popover';
import * as coreComponents from '../../components/core-components';


const Dashboard: React.FC = () => {

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return <Layout>
    <h2>Dashboard Page</h2>
    <div className='mb-4 mt-4'>
      <Popover title="Popover Header" content={<p>This is the popover content.</p>}>
        Click
      </Popover>
    </div>
    
    <coreComponents.Button 
      label="Create Story"
      type="primary"
      clickHandler={openModal}
    />  
    <Modal isOpen={isModalOpen} onClose={closeModal} title="Create User Story" size='lg'>
      <CreateStory />
    </Modal>
  </Layout>;
};

export default Dashboard;