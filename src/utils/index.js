export const convertSecondsToMMSS = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;
    if (remainingSeconds < 10) {
        remainingSeconds = '0' + remainingSeconds;
    }
    return minutes + ':' + remainingSeconds;
};

export const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return seconds ? `${formattedMinutes}:${formattedSeconds}` : NaN;
};

export const convertSeconds = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;
    return `${hours} giờ ${minutes} phút ${remainingSeconds} giây`;
};

export const chunkArray = (myArray, chunk_size) => {
    var index = 0;
    var arrayLength = myArray?.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
        tempArray.push(myArray.slice(index, index + chunk_size));
    }

    return tempArray;
};

export const shufflePlaylist = (playlist, currentSong) => {
    const shuffled = playlist
        .filter((song) => song.encodeId !== currentSong.encodeId)
        .sort(() => Math.random() - 0.5);
    const res = [currentSong, ...shuffled];

    return res;
};

export const getSectionBySectionId = (artist, sectionId) => {
    return artist?.sections?.find((section) => section.sectionId === sectionId);
};

export const isExistFavoriteSongs = (dataUser, songCheck) => {
    return (
        dataUser?.favoriteList?.song?.items?.findIndex(
            (song) => song?.encodeId === songCheck?.encodeId,
        ) >= 0
    );
};

export { default as request } from './request';
