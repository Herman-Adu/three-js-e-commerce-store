import Link from "next/link";
import React from "react";

const Sale = () => {
  return (
    <div className="max-w-[1536px] flex flex-col items-center gap-8 pt-32 mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-center">
        Limited collection <br /> for sale
      </h2>
      <p className="uppercase text-sm font-bold bg-gradient bg-clip-text text-transparent">
        discounts up to 30%
      </p>
      <Link
        href="#catalog"
        className="w-36 flex flex-col items-center py-3 rounded-xl text-xs bg-gradient"
      >
        Buy keyboard
      </Link>
    </div>
  );
};

export default Sale;
