
import { useState } from "react";

function FlipCard({ frontImg, name, backText }) {
  const [flipped, setFlipped] = useState(false);

  return (

    <div
        // ขนาดของcard
      className="w-64 h-64 [perspective:1000px] cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* ด้านหน้า */}
        <div className="absolute w-full h-full bg-green-100 border-4 border-black rounded-lg shadow-[6px_6px_0_0_#000] flex flex-col items-center justify-center [backface-visibility:hidden]">
          {/* <h2 className="font-bold text-xl mb-2">{name}</h2> */}
          <img
            src={frontImg}
            alt={name}
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* ด้านหลัง (ข้อความ) */}
        <div className="absolute w-full h-full bg-yellow-200 border-4 border-black rounded-lg shadow-[6px_6px_0_0_#000] flex items-center justify-center text-center px-4 text-lg font-semibold [transform:rotateY(180deg)] [backface-visibility:hidden]">
          {backText}
        </div>
      </div>
    </div>
  );
}

import React from 'react'


export const AboutPages = () => {
  return (
    <div>
        <h className='text-4xl m-5 flex justify-center'>About Us</h>
        <div className="min-h-screen flex items-start justify-center gap-6 ">
            <FlipCard
                // name="Cat 1"
                frontImg="src/assets/images/creator/kao.webp"
                backText="Setthawut(Kao)"
            />
            <FlipCard
                // name="Cat 2"
                frontImg="src/assets/images/creator/gad.webp"
                backText="Nuttapat(Gad)"
            />
            <FlipCard
                // name="Cat 3"
                frontImg="src/assets/images/creator/kim.webp"
                backText="Thanawat(kim)"
            />
            <FlipCard
                // name="Cat 4"
                frontImg="src/assets/images/creator/bae.webp"
                backText="Wanpen(Bae)"
            />
            <FlipCard
                // name="Cat 5"
                frontImg="src/assets/images/creator/Ja.webp"
                backText="Thunyaluk(Ja)"
            />
        </div>
    </div>
  )
}


