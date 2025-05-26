import api from '../api/axios';

export const textOnly = async (prompt: string) => {
    const { data } = await api.post(`/TextOnly?prompt=${prompt}`);
    return data
}
