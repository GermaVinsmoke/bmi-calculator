import React from 'react';
import './App.css';

import styled from '@emotion/styled/macro';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AppHub } from "src/containers/AppHub";

library.add(faEye, faEyeSlash);

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 650px;
`;

export const App = () => {
    return (
        <Container>
            <AppHub

            />
        </Container>
    );
};

