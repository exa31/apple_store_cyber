import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';

const Spinner: React.FC = () => (
    <Flex align="center" gap="middle">
        <Spin indicator={<LoadingOutlined spin />} size="large" />
    </Flex>
);

export default Spinner;