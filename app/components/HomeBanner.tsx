"use client";

import Image from "next/image";
import Carousel from "./Carousel";

const HomeBanner = () => {
    return (
        <Carousel/>
        // <div className="
        // relative
        // bg-gradient-to-r
        // from-sky-500
        // to-sky-700
        // mb-8
        // ">
        //     <div className="
        //     mx-auto
        //     px-8 py-12
        //     flex flex-col gap-2 md:flex-row
        //     items-center
        //     justify-evenly
        //     ">
        //         <div className="mb-8 md:mb-0 text-center">
        //             <h1 className="text-4xl md:text-6xl text-white mb-4">Summer Sale</h1>
        //             <div className="text-lg md:text-xl text-white md-2">Enjoy discount on selected items</div>
        //             <p className="text-2xl md:text-5xl text-yellow-400 font-bold">GET 50% OFF</p>
        //         </div>
        //         <div className="w-2/3 md:w-1/3 relative aspect-video">
        //             <Image
        //                 alt='banner'
        //                 fill
        //                 src='/banner-image.png'
        //                 className="object-contain"
        //             />
        //         </div>
        //     </div>
        // </div>
     );
}

export default HomeBanner;
