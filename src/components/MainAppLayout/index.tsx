import { FC } from "react";

//h-screen overflow-y-scroll
//max-h-screen overflow-y-scroll
const MainLayOut: FC = ({ children }) => {
  return (
    <section className="grid md:grid-cols-4 flex-grow t-10 md:pt-20 ">
      <div className=" hidden md:flex flex-col items-center px-2  text-center  ">
        <p>tevihvksdv</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis hic,
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis hic,
        </p>
      </div>

      <div className=" md:col-span-2">{children}</div>

      <div className="hidden md:flex flex-col items-center px-4">
        <p>jekbvJEBvjbdjbv</p>
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
