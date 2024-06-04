import { PAUSE_SONG, PLAY_SONG } from './constants';

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
    }
}

export { initState };
export default reducer;
