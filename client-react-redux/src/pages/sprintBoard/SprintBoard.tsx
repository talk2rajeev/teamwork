import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const SprintBoard: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  console.log(productId);
  return (
    <Layout>
      <h2>SprintBoard Page</h2>
    </Layout>
  );
};

export default SprintBoard;
