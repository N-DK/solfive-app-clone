import request from "~/utils/request";

export const getHome = async () => {
    try {
        const res = await request.get('get/home');
        return res.data;
    } catch (error) {}
};
