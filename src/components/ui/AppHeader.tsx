import React from 'react';
import Logo from 'public/logo.svg';
import novesLogo from 'public/Noves_Brandmark_RGB.svg';
import xImage from 'public/xIcon.svg';
import Image from 'next/image';
import Link from 'next/link';

const AppHeader = () => {
    return (
        <div className="app-header-container">
            <div className="flex flex-col gap-2.5 items-center">
                <div className="flex gap-6 items-end">
                    <Link
                        href="https://noves.fi"
                        target="_blank"
                        className="flex flex-col gap-2.5 items-center cursor-pointer"
                    >
                        <Image src={novesLogo} alt="noves" className="w-8" />
                        <div className="text-center text-white text-xl font-extrabold leading-[30px] tracking-wider">
                            Noves
                        </div>
                    </Link>
                    <Image src={xImage} alt="separator" className="w-4 h-4" />{' '}
                    <div className="flex flex-col gap-2.5 items-center">
                        <Image src={Logo} alt="logo" />
                        <div className="text-center text-white text-xl font-extrabold font-['Inter'] leading-[30px]">
                            Magic
                        </div>
                    </div>
                </div>
                <div className="text-center text-white text-opacity-50 text-base font-normal font-['SF Mono'] leading-normal">
                    Demo
                </div>
            </div>
        </div>
    );
};

export default AppHeader;
