import api from '../api/client';

interface Info {
    name: string;
    url: string;
}

const getData = async (): Promise<Array<Info>> => {
    try {
        const response = await api.get('/data');

        const data = response.data;
        const arrayFromData = Object.entries(data).map(([name, info]: [string, any]) => ({
            name,
            url: info.url,
        }));

        return arrayFromData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export { getData };