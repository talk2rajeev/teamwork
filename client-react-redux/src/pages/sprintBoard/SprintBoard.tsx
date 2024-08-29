import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import CreateStory from '../../components/appComponents/createStory/CreateStory';
import Modal from '../../components/modal/Modal';
import * as coreComponents from '../../components/core-components';
import Popover from '../../components/popover/popover';

const SprintBoard: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const params = useParams<{ productId: string }>();

  console.log('params >>>>>>>>>>>>> ', params);

  const { productId } = useParams<{ productId: string }>();
  console.log(productId);
  return (
    <Layout>
      <div className="mb-4 mt-4">
        Project /&nbsp;
        <Popover
          title="Change Product"
          content={
            <coreComponents.SearchableCombobox
              items={['Epirurian', 'Next Gen', 'OMDS', 'Managed Extensions']}
              onSelect={(item: string) => {
                console.log(item);
              }}
              label="Product Name"
              placeholder="Search Product"
            />
          }
        >
          Managed Extensions
        </Popover>
      </div>

      <coreComponents.Button
        label="Create Story"
        type="primary"
        clickHandler={openModal}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Create User Story"
        size="lg"
        footer={false}
      >
        <CreateStory />
      </Modal>
    </Layout>
  );
};

export default SprintBoard;
