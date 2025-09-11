import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function FlipCard({ frontImg, name, backText }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      // ขนาดของ card
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

export const AboutPages = () => {
  return (
    <div>
      <section>
        <div className="mt-8">
          {/* About Us — Re:Furnish (Neobrutalism style) */}
          <Card className="bg-amber-100 border-4 border-black rounded-2xl shadow-[8px_8px_0_0_#000]">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl md:text-3xl tracking-tight">
                About Us — Re:Furnish
              </CardTitle>
              <CardDescription className="text-black">
                <span className="font-semibold underline decoration-4 decoration-black">
                  Concept
                </span>
                : A wordplay combining <span className="font-bold">Re:</span>{" "}
                (repetition, reply, bringing back) and{" "}
                <span className="font-bold">Furnish</span> (furniture,
                decoration) to convey
                <span className="font-bold">
                  {" "}
                  “bringing furniture back to life and giving it a new story.”
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Story blurb */}
              <div className="p-4 bg-white border-4 border-black rounded-xl shadow-[4px_4px_0_0_#000]">
                <p className="leading-relaxed">
                  We revive pre-loved pieces with care, creativity, and
                  honesty—so every item returns with a second chapter worth
                  sharing.
                </p>
              </div>

              {/* Brand Keywords */}
              <div>
                <h3 className="text-xl font-bold">Our philosophy</h3>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Sustainable */}
                  <div className="p-4 bg-lime-200 border-4 border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:-translate-y-1 transition">
                    <p className="text-lg font-extrabold">Sustainable</p>
                    <p className="text-sm mt-1">
                      We care for the planet and promote resource circulation.
                    </p>
                  </div>

                  {/* Unique */}
                  <div className="p-4 bg-pink-200 border-4 border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:-translate-y-1 transition">
                    <p className="text-lg font-extrabold">Unique</p>
                    <p className="text-sm mt-1">Every item is one-of-a-kind.</p>
                  </div>

                  {/* Story-driven */}
                  <div className="p-4 bg-sky-200 border-4 border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:-translate-y-1 transition">
                    <p className="text-lg font-extrabold">Story-driven</p>
                    <p className="text-sm mt-1">
                      We don’t just sell objects; we pass on their stories.
                    </p>
                  </div>

                  {/* Refurbished */}
                  <div className="p-4 bg-amber-200 border-4 border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:-translate-y-1 transition">
                    <p className="text-lg font-extrabold">Refurbished</p>
                    <p className="text-sm mt-1">
                      Every piece is carefully taken care of and improved.
                    </p>
                  </div>

                  {/* Creative */}
                  <div className="p-4 bg-violet-200 border-4 border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:-translate-y-1 transition">
                    <p className="text-lg font-extrabold">Creative</p>
                    <p className="text-sm mt-1">
                      We see beauty and value in what others might overlook.
                    </p>
                  </div>

                  {/* Trustworthy */}
                  <div className="p-4 bg-teal-200 border-4 border-black rounded-xl shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:-translate-y-1 transition">
                    <p className="text-lg font-extrabold">Trustworthy</p>
                    <p className="text-sm mt-1">
                      We are transparent and honest in our presentation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="justify-between">
              <span className="text-sm font-semibold">
                Give Furniture a Second Chapter.
              </span>
              <span className="text-sm">Re:Furnish</span>
            </CardFooter>
          </Card>
        </div>
      </section>

      <br />
      <br />

      <div className="min-h-screen flex items-start justify-center gap-6">
        <FlipCard
          frontImg="src/assets/images/creator/kao.webp"
          backText="Setthawut(Kao)"
        />
        <FlipCard
          frontImg="src/assets/images/creator/bae.webp"
          backText="Wanpen(Bae)"
        />
        <FlipCard
          frontImg="src/assets/images/creator/kim.webp"
          backText="Thanawat(kim)"
        />
        <FlipCard
          frontImg="src/assets/images/creator/Ja.webp"
          backText="Thunyaluk(Ja)"
        />
        <FlipCard
          frontImg="src/assets/images/creator/gad.webp"
          backText="Nuttapat(Gad)"
        />
      </div>
    </div>
  );
};

export default AboutPages;
