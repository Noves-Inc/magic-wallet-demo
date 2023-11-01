import type { NextApiRequest, NextApiResponse } from 'next';

const translateEnpoint = 'https://translate.noves.fi';
const apiKey = process.env.TRANSLATE_API_KEY as string;

const handler = async (nextReq: NextApiRequest, nextRes: NextApiResponse) => {
    if (nextReq.method !== 'POST') {
        return nextRes.status(404).send({
            success: false,
            message: 'Method not supported',
        });
    }
    var { address, page, chain } = nextReq.body;

    if (chain == 'ethereum') {
        chain = 'eth';
    }

    const url = `${translateEnpoint}/evm/${chain}/txs/${address}?pageNumber=${page}&pageSize=10&liveData=true&viewAsAccountAddress=${address}`;
    const headers = {
        apiKey: apiKey,
    };

    try {
        const res = await fetch(url, {
            headers,
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
