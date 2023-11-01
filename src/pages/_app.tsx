import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import MagicProvider from '@/components/magic/MagicProvider';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MagicProvider>
            <Head>
                <title>Noves &lt;&gt; Magic Demo</title>
            </Head>
            <Component {...pageProps} />
        </MagicProvider>
    );
}
