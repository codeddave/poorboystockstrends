import { FC } from "react";

//h-screen overflow-y-scroll
//max-h-screen overflow-y-scroll
const MainLayOut: FC = ({ children }) => {
  return (
    <section className="grid md:grid-cols-5 flex-grow t-10 md:pt-32">
      <div className=" hidden md:flex flex-col items-center px-2  text-center pt-32  ">
        <ul className="border w-full">
          <li className="border-b py-2 text-left pl-3">Country</li>
          <li className="border-b py-2 text-left pl-3">Exhange</li>
          <li className="border-b py-2 text-left pl-3">Sector</li>
          <li className="border-b py-2 text-left pl-3">Industry</li>
          <li className="border-b py-2 text-left pl-3">Stock</li>
          <li className="border-b py-2 text-left pl-3">Interval</li>
        </ul>
        {/*   <p className="text-3xl">Ads go here</p> */}
      </div>

      <div className="px-6  pt-24 md:pt-0 md:col-span-3">{children}</div>

      <div className="hidden md:flex flex-col items-center px-4 pt-32 ">
        <p className="text-3xl">Ads go here</p>
      </div>
    </section>
  );
};

export default MainLayOut;

/* 
import { FC } from "react";

//h-screen overflow-y-scroll
//max-h-screen overflow-y-scroll
const MainLayOut: FC = ({ children }) => {
  return (
    <section className="flex flex-grow pt-10 md:pt-20 md:pl-4">
      <div className=" flex flex-col items-center px-2 w-1/4  text-center  ">
        <p>tevihvksdv</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis hic,
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis hic,
        </p>
      </div>

      <div className="w-2/4">{children}</div>

      <div className="flex flex-col items-center px-4 w-1/4">
        <p>jekbvJEBvjbdjbv</p>
      </div>
    </section>
  );
};

export default MainLayOut;
 */
