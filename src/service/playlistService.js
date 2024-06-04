import request from '~/utils/request';

export const getPlaylistById = async (id) => {
    try {
        const res = await request.get(`get/playlist/info?id=${id}`);
        return res.data.data;
    } catch (error) {}
};
