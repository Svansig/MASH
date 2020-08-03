import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { ProducerContainer } from './Components/Containers/Producer';
import { ConsumerContainer } from 'Components/Containers/Consumer';
// import { stylesFactory, useTheme } from '@grafana/ui';

interface Props extends PanelProps<SimpleOptions> {}

const TESTBED_SOCKET_ADDRESS = 'localhost:2022';
const CANNON_SOCKET_ADDRESS = 'localhost:2024';

const connectToSocket = (socketAddress: string) => {
  const socket = io(socketAddress);
  return socket;
};

export const ControlPanel: React.FC<Props> = ({ options, data, width, height }) => {
  const [socket, setSocket] = useState(connectToSocket(TESTBED_SOCKET_ADDRESS));
  const [topic, setTopic] = useState('test-topic');
  const [showStatus, setShowStatus] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => setTopic(e.target.value);
  const toggleStatus = () => setShowStatus(!showStatus);
  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
  }, [socket]);

  return (
    <div style={{ width, height, margin: 'auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <h2>Welcome to the Control Panel</h2>
        <div style={{ marginLeft: 'auto' }}>
          {showStatus && `Status: ${isConnected ? 'Connected' : 'Not Connected'}`}
          <svg width={10} height={10} style={{ marginLeft: '0.5rem' }} onClick={toggleStatus}>
            <g>
              <circle cx="5" cy="5" r="5" fill={isConnected ? 'green' : 'red'} />
            </g>
          </svg>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ minWidth: '35vw', textAlign: 'start' }}>
          <h3>Please choose a topic:</h3>
        </div>
        <input style={{ marginLeft: '1rem' }} type="text" value={topic} onChange={handleTopicChange} />
      </div>
      <ProducerContainer socket={socket} width={width} topic={topic} setTopic={setTopic} isConnected={isConnected} />
      <ConsumerContainer socket={socket} width={width} topic={topic} setTopic={setTopic} />
    </div>
  );
};