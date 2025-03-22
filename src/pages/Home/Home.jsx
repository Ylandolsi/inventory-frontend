import { Plus } from "lucide-react";
import "./Home.scss";

export function Home() {
  return (
    <div className="flex flex-col gap-5 items-center m-5 p-10 border rounded-lg">
      <p className="WelcomeHome ">Welcome to the Bookstore Inventory</p>
      <p
        style={{
          fontWeight: 200,
          opacity: 0.8,
        }}
      >
        This is a simple app to manage your bookstore inventory.
      </p>
      <div className="mt-5 w-full flex flex-row justify-center items-center gap-10 flex-wrap">
        <div className="HoverHome">
          <p className="text-2xl font-bold ">Books</p>
          <div className="text-3xl font-bold">1</div>
          <div className="font-thin">Total in inventory</div>
        </div>
        <div className="HoverHome">
          <p className="text-2xl font-bold">Books</p>
          <div className="text-3xl font-bold">1</div>
          <div className="font-thin">Total in inventory</div>
        </div>
        <div className="HoverHome ">
          <p className="text-2xl font-bold">Books</p>
          <div className="text-3xl font-bold">1</div>
          <div className="font-thin">Total in inventory</div>
        </div>
      </div>

      <div className=" flex flex-col gap-4 w-full mt-3">
        <p className="font-bold text-2xl mr-auto "> Quick Actions </p>
        <div className=" flex flex-row gap-4 flex-wrap">
          <a href="/books/add" className="HoverHomeActions     ">
            <Plus></Plus>
            <div className=" flex flex-col justify-center">
              <div className="text-xl font-bold"> Add New Book</div>
              <div className="text-sm"> Add a new book to inventory</div>
            </div>
          </a>
          <a href="/books/add" className="HoverHomeActions    ">
            <Plus></Plus>
            <div className="flex flex-col justify-center">
              <div className="text-xl font-bold"> Add New Author</div>
              <div className="text-sm"> Add a new author profile </div>
            </div>
          </a>
          <a href="/books/add" className="HoverHomeActions    ">
            <Plus></Plus>
            <div className="flex flex-col justify-center">
              <div className="text-xl font-bold"> Add New Genre</div>
              <div className="text-sm"> Create a new book genre</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
