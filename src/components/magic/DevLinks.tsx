import React from 'react';

interface Props {
    dark?: boolean;
    footer?: boolean;
}

const Links = ({ dark, footer }: Props) => {
    return (
        <div className={`links ${footer ? 'footer-links' : ''}`}>
            <div className={`link ${dark ? 'text-[#6851ff]' : 'text-[#fff]'}`}>
                <a
                    href="https://docs.noves.fi/docs/wallets-quickstart"
                    target="_blank"
                    rel="noreferrer"
                >
                    Noves Docs
                </a>
            </div>
            <div
                className={`link-divider ${
                    dark ? 'bg-[#DDDBE0]' : 'bg-[#a270d3]'
                }`}
            />
            <div className={`link ${dark ? 'text-[#6851ff]' : 'text-[#fff]'}`}>
                <a
                    href="https://magic.link/docs/home/welcome"
                    target="_blank"
                    rel="noreferrer"
                >
                    Magic Docs
                </a>
            </div>
            <div
                className={`link-divider ${
                    dark ? 'bg-[#DDDBE0]' : 'bg-[#a270d3]'
                }`}
            />
            <div className={`link ${dark ? 'text-[#6851ff]' : 'text-[#fff]'}`}>
                <a
                    href="https://dashboard.magic.link/signup"
                    target="_blank"
                    rel="noreferrer"
                >
                    Magic Dashboard
                </a>
            </div>
            <div
                className={`link-divider ${
                    dark ? 'bg-[#DDDBE0]' : 'bg-[#a270d3]'
                }`}
            />
            <div className={`link ${dark ? 'text-[#6851ff]' : 'text-[#fff]'}`}>
                <a href="https://app.noves.fi" target="_blank" rel="noreferrer">
                    Noves Dashboard
                </a>
            </div>
        </div>
    );
};

export default Links;
