import fs from 'fs'

export const listBanners = async () => {
    const banners = await fs.readFileSync('data/banners.json');

    return {
        data: JSON.parse(banners.toString())
    }
};
