import { requestUser } from '~/utils/request';
export const login = async (credentialResponse) => {
    try {
        const res = await requestUser.post('auth/google', credentialResponse);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const dropHeart = async (payload) => {
    try {
        const res = await requestUser.post('song/like', payload, {
            headers: {
                'Authentication-Token': `Bearer ${localStorage.getItem(
                    'token',
                )}`,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getUser = async () => {
    try {
        const res = await requestUser.get('info/init', {
            headers: {
                'Authentication-Token': `Bearer ${localStorage.getItem(
                    'token',
                )}`,
            },
        });
        return res.data;
    } catch (error) {}
};
