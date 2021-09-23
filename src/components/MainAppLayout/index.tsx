import { FC } from "react";

//h-screen overflow-y-scroll
//max-h-screen overflow-y-scroll
const MainLayOut: FC = ({ children }) => {
  return (
    <section className="flex flex-grow b ">
      <div className=" flex flex-col items-center px-4 w-1/6 border">
        <p>tevihvksdv</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis hic,
          itaque necessitatibus aliquid eligendi fugit atque corrupti suscipit.
          Incidunt quas molestias ab fuga aliquam voluptatibus possimus totam,
          in alias suscipit.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis hic,
          itaque necessitatibus aliquid eligendi fugit atque corrupti suscipit.
          Incidunt quas molestias ab fuga aliquam voluptatibus possimus totam,
          in alias suscipit.
        </p>
      </div>

      <div className=" b  w-4/6 border">{children}</div>

      <div className="-1 b  flex flex-col items-center px-4 border w-1/6 ">
        <p>jekbvJEBvjbdjbv</p>
      </div>
    </section>
  );
};

export default MainLayOut;
