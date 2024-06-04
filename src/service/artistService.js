import request from '~/utils/request';

export const getArtistById = async (id) => {
    try {
        const res = await request.get(`get/artist?id=${id}`);
        return res.data.data;
    } catch (error) {
        console.log(error);
    }
};
