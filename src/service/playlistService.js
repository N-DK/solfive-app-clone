import request, { requestUser } from '~/utils/request';

export const getPlaylistById = async (id) => {
    try {
        if (id === 'favorite') {
            const res = await requestUser.get('get/playlist/favorite', {
                headers: {
                    'Authentication-Token': `Bearer ${localStorage.getItem(
                        'token',
                    )}`,
                },
            });
            return res.data.data;
        } else {
            const res = await request.get(`get/playlist/info?id=${id}`);
            return res.data.data;
        }
    } catch (error) {}
};
