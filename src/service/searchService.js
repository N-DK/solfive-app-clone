import { request } from '~/utils';

export const search = async (query) => {
    try {
        const res = await request.get('', {
            params: {
                query,
            },
        });
        return res.data;
    } catch (error) {}
};
