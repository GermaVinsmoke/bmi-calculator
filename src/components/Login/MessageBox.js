import React from 'react';
import styled from '@emotion/styled/macro';

export let BoxProps = {
    messages: [],
    status: 'success' | 'failure',
};
export let Box = styled.div`
  text-align: center;
  border: 1px solid;
  padding: 10px;
  font-size: 10px;
  margin: 20px 0;
`;
//Box.style.color = BoxProps.status === 'success' ? 'black' : 'red';

export const MessageBox = () => {
    const messagesText = BoxProps.messages.map((message, index) => {
        return <p key={index}>{message}</p>
    });

    return (
        <Box status={BoxProps.status}>
            {messagesText}
        </Box>
    )
};
