import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App2 from "./App2";
import '@testing-library/jest-dom'
import React from "react";
import * as api from '../api';

jest.mock('../api')


describe('Testing Login module ', () => {

    test('username field should be rendered with empty string', () => {
        render(<App2 />)
        const usernameInputEle = screen.getByPlaceholderText('username');
        expect(usernameInputEle).toBeInTheDocument();
        expect(usernameInputEle.value).toBe('');
    })

    test('password field should be rendered with empty string', () => {
        render(<App2 />)
        const passwordInputEle = screen.getByPlaceholderText('password');
        expect(passwordInputEle).toBeInTheDocument();
        expect(passwordInputEle.value).toBe('');
    })


    test('login button should be disabled when there is not value inside username and password field', () => {
        render(<App2 />)
        const usernameInputEle = screen.getByPlaceholderText('username');
        const passwordInputEle = screen.getByPlaceholderText('password');
        const logInButtonEle = screen.getByRole('button');

        // Setting both input element as empty
        fireEvent.change(usernameInputEle, { target: { value: '' } })
        fireEvent.change(passwordInputEle, { target: { value: '' } })
        expect(logInButtonEle).toBeDisabled();
    })


    test('login button should not be disabled when there is value inside username and password field', () => {
        render(<App2 />)
        const usernameInputEle = screen.getByPlaceholderText('username');
        const passwordInputEle = screen.getByPlaceholderText('password');
        const logInButtonEle = screen.getByRole('button');

        // Setting both input element as some temp text
        fireEvent.change(usernameInputEle, { target: { value: 'temp' } })
        fireEvent.change(passwordInputEle, { target: { value: 'temp' } })
        expect(logInButtonEle).not.toBeDisabled();
    })

    test('login success should be rendered after successfully login', async () => {

        render(<App2 />)

        const usernameInputEle = screen.getByPlaceholderText('username');
        const passwordInputEle = screen.getByPlaceholderText('password');
        const logInButtonEle = screen.getByRole('button');

        fireEvent.change(passwordInputEle, { target: { value: 'temp' } })
        fireEvent.change(usernameInputEle, { target: { value: 'temp' } })

        await waitFor(() => {
            api.apiCall.mockResolvedValue({

                data: {
                    login: 'success'
                }
            })
            fireEvent.click(logInButtonEle)
        })

        await waitFor(async () => {
            const messageEle = await screen.findByTestId('message');
            expect(messageEle.textContent).toMatch(/login success/i);
            expect(api.apiCall).toHaveBeenCalledTimes(1);
        })

    })

    test('login failed should be rendered after login failed', async () => {

        render(<App2 />)

        const usernameInputEle = screen.getByPlaceholderText('username');
        const passwordInputEle = screen.getByPlaceholderText('password');
        const logInButtonEle = screen.getByRole('button');

        fireEvent.change(passwordInputEle, { target: { value: 'temp' } })
        fireEvent.change(usernameInputEle, { target: { value: 'temp' } })

        await waitFor(() => {
            api.apiCall.mockResolvedValue({
                data: {
                    login: 'failed'
                }
            })
            fireEvent.click(logInButtonEle)
        })

        await waitFor(async () => {
            const messageEle = await screen.findByTestId('message');
            expect(messageEle.textContent).toMatch(/login failed/i);
            expect(api.apiCall).toHaveBeenCalledTimes(1);
        })

    })
    
    test('network error should be rendered when can not call api', async () => {
        render(<App2 />)

        const usernameInputEle = screen.getByPlaceholderText('username');
        const passwordInputEle = screen.getByPlaceholderText('password');
        const logInButtonEle = screen.getByRole('button');

        fireEvent.change(passwordInputEle, { target: { value: 'temp' } })
        fireEvent.change(usernameInputEle, { target: { value: 'temp' } })

        await waitFor(() => {
            // Not calling api to show network error
            // api.apiCall.mockResolvedValue({

            // }) 
            fireEvent.click(logInButtonEle)
        })

        await waitFor(async () => {
            const messageEle = await screen.findByTestId('message');
            expect(messageEle.textContent).toMatch(/network error/i);
            expect(api.apiCall).toHaveBeenCalledTimes(1);
        })

    })
}) 