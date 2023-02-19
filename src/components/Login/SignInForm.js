import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled/macro';
import css from '@emotion/css/macro'
import * as yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MessageBox } from './MessageBox';
import { authenticate } from '../../service/requests';

const Form = styled.form`
  font-family: Noto Sans JP;
  width: 300px;
  background: #fff;
  padding: 40px;
`;

const FieldWrapperStyle = css`
  position: relative;
`;


const EmailFieldWrapper = styled.div`
  position: relative;
`;

const PasswordFieldWrapper = styled.div`
  position: relative;
`;

const FieldStyle = css`
  display: block;
  width: 100%;
  height: 40px;
  font-size: 14px;
  padding: 0 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const EmailField = styled.input`
  display: block;
  width: 100%;
  height: 40px;
  font-size: 14px;
  padding: 0 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

const PasswordField = styled.input`
  display: block;
  width: 100%;
  height: 40px;
  font-size: 14px;
  padding: 0 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 0 45px 0 10px;
`;

const SignInButton = styled.button`
  background: #333;
  color: #fff;
  font-size: 14px;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  font-weight: bold;
`;

const PasswordVisibleButton = styled.button`
  font-size: 14px;
  color: #333;
  border: none;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState(null);
    const [canSubmit, setCanSubmit] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [visiblePassword, setVisiblePassword] = useState(false);

    const onChangeField = event => {
        switch (event.target.name) {
            case 'email':
                setEmail(event.target.value);
                break;
            case 'password':
                setPassword(event.target.value);
                break;
        }
    };

    const onClickButton = (event) => {
            switch (event.currentTarget.name) {
                case 'visible_password':
                    setVisiblePassword(!visiblePassword);
                    break;
            }
        };

    export async function validate (values) {
        const signInScheme = yup.object().shape({
            email: yup
                .string()
                .email('Email must be a valid.')
                .required('Email must not be a empty.'),
            password: yup
                .string()
                .min(8, 'Password must be at least 8 characters.')
                .matches(/^[A-Za-z0-9●!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/, 'Password must be a valid.')
                .required('Password must not be a empty.')
        });

        try {
            await signInScheme.validate(values, { abortEarly: false });
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        (async () => {
            if (canSubmit) {
                setMessages(null);
                try {
                    await authenticate(email, password);
                    setEmail('');
                    setPassword('');
                    setMessages(['Sign In Successfully.']);
                    setCanSubmit(false);
                    setHasError(false);
                } catch (error) {
                    setMessages([error.message]);
                    setCanSubmit(false);
                    setHasError(true);
                }
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canSubmit]);

    export const onSubmit = async (event) => {
        event.preventDefault();

        const formValues = {
            email,
            password,
        };

        try {
            await validate(formValues);
            setCanSubmit(true);
            setHasError(false);
        } catch (error) {
            setMessages(error.errors);
            setCanSubmit(false);
            setHasError(true);
        }
    }

    return (
        <Form
            onSubmit={onSubmit}
        >
            <EmailFieldWrapper>
                <EmailField
                    name='email'
                    placeholder='Email'
                    type='email'
                    value={email}
                    onChange={onChangeField}
                />
            </EmailFieldWrapper>
            <PasswordFieldWrapper>
                <PasswordField
                    name='password'
                    placeholder='Password'
                    type={visiblePassword ? 'text' : 'password'}
                    value={password}
                    onChange={onChangeField}
                />
                <PasswordVisibleButton
                    type='button'
                    name='visible_password'
                    onClick={onClickButton}
                >
                    <FontAwesomeIcon icon={visiblePassword ? 'eye-slash' : 'eye'} />
                </PasswordVisibleButton>
            </PasswordFieldWrapper>
            {messages &&
                <MessageBox
                    messages={messages}
                    status={hasError ? 'failure' : 'success'}
                />}
            <SignInButton
                type='submit'
            >
                SIGN IN
            </SignInButton>
        </Form>
    )
};

export default SignInForm;