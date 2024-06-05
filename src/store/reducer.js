import { PAUSE_SONG, PLAY_SONG, SET_PLAYLIST } from './constants';

const initState = {
    playlist: [],
    currentAudio: null,
    currentSong: null,
    playListId: null,
    isPlaying: false,
};

function reducer(state, action) {
    switch (action.type) {
        case PLAY_SONG: {
            return {
                ...state,
                currentAudio: action.payload.audio,
                currentSong: action.payload.song,
                playListId: action.payload.playListId,
                playlist: action.payload.playlist,
                isPlaying: true,
            };
        }
        case PAUSE_SONG: {
            return {
                ...state,
                currentAudio: action.payload,
                isPlaying: false,
            };
        }
        case SET_PLAYLIST: {
            return {
                ...state,
                playlist: action.payload,
            };
        }
    }
}

export { initState };
export default reducer;
