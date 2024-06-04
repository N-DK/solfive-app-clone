import request from '~/utils/request';

export const getSongById = async (id) => {
    try {
        const res = await request.get(`get/song/info?id=${id}`);
        return res.data.data;
    } catch (error) {}
};

export const getSoundSongById = async (id) => {
    try {
        const res = await request.get(`get/song/sound?id=${id}`);
        return res.data.data;
    } catch (error) {}
};

export const getLyricSongById = async (id) => {
    try {
        const res = await request.get(`get/song/lyric?id=${id}`);
        return res.data.data;
    } catch (error) {}
};
