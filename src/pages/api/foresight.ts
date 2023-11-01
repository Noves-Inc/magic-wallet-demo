import type { NextApiRequest, NextApiResponse } from 'next';

const foresightEnpoint = 'https://foresight.noves.fi';
const apiKey = process.env.TRANSLATE_API_KEY as string;

const handler = async (nextReq: NextApiRequest, nextRes: NextApiResponse) => {
    if (nextReq.method !== 'POST') {
        return nextRes.status(404).send({
            success: false,
            message: 'Method not supported',
        });
    }
    const { data, address, chain } = nextReq.body;

    const url = `${foresightEnpoint}/evm/${chain}/preview?viewAsAccountAddress=${address}`;
    const headers = {
        apiKey: apiKey,
        'Content-Type': 'application/json',
    };

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });
        const json = await res.json();

        nextRes.status(res.status).send(json);
    } catch (error) {
        console.log(error);
        nextRes
            .status(400)
            .send({ success: false, message: 'Something went wrong' });
    }
};

export default handler;
