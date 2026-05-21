import { render, screen, waitFor } from '@testing-library/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import { ProviderMusic } from './store';

jest.mock('axios', () => {
    const requestMock = {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
    };

    return {
        create: jest.fn(() => requestMock),
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
    };
});

jest.mock('~/service', () => ({
    getHome: jest.fn(() => new Promise(() => {})),
    getPlaylistById: jest.fn(),
    getArtistById: jest.fn(),
    getSongById: jest.fn(),
    getSoundSongById: jest.fn(),
    getLyricSongById: jest.fn(),
    search: jest.fn(),
    login: jest.fn(),
    dropHeart: jest.fn(),
    getUser: jest.fn(() => new Promise(() => {})),
}));

jest.mock('~/service/userService', () => ({
    getUser: jest.fn(() => new Promise(() => {})),
    login: jest.fn(),
    dropHeart: jest.fn(),
}));

test('renders Solfive app shell', async () => {
    render(
        <GoogleOAuthProvider clientId="test-client-id">
            <ProviderMusic>
                <App />
            </ProviderMusic>
        </GoogleOAuthProvider>,
    );

    await waitFor(() => {
        expect(screen.getByText(/Solfive/i)).toBeInTheDocument();
    });
});
