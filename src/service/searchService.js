import { request } from '~/utils';

export const search = async (query) => {
    try {
        const res = await request.get(`get/song/search?id=${query}`);
        return res.data.data;
    } catch (error) {}
};
