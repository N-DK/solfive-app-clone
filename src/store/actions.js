import { PAUSE_SONG, PLAY_SONG } from './constants';

export const playSong = (payload) => {
    return {
        type: PLAY_SONG,
        payload,
    };
};

export const pauseSong = (payload) => {
    return {
        type: PAUSE_SONG,
        payload,
    };
};
