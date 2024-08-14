import Navbar from "../components/Navbar";
import ServicesIcon from "../components/ServicesIcon";

const Home = () => {
  return (
    <div className="bg-[#DDE2E1] min-h-screen">
      <Navbar />
      <div className="flex flex-col">
        <h1 className="font-extrabold text-[26px] md:text-[64px] text-center mt-20">
          Search Services
        </h1>
        <label className="relative self-center flex gap-4 items-center justify-between w-[90%] md:w-[70%] px-3 py-2 bg-[#05846A8C] rounded-[100px] h-[50px]">
          <input
            type="text"
            placeholder="Type Here"
            className="w-full placeholder:text-[#00000054]  font-semibold border-none outline-none px-2 bg-transparent"
          />
          <svg
            width="25"
            height="25"
            viewBox="0 0 35 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.88889 13.6111C3.88889 8.24169 8.24169 3.88889 13.6111 3.88889C18.9805 3.88889 23.3334 8.24169 23.3334 13.6111C23.3334 18.9805 18.9805 23.3334 13.6111 23.3334C8.24169 23.3334 3.88889 18.9805 3.88889 13.6111ZM13.6111 0C6.09392 0 0 6.09392 0 13.6111C0 21.1284 6.09392 27.2223 13.6111 27.2223C16.6684 27.2223 19.4904 26.2143 21.7626 24.5125L31.6807 34.4305C32.44 35.1898 33.6712 35.1898 34.4305 34.4305C35.1898 33.6712 35.1898 32.44 34.4305 31.6807L24.5125 21.7626C26.2143 19.4904 27.2223 16.6684 27.2223 13.6111C27.2223 6.09392 21.1284 0 13.6111 0Z"
              fill="#212121"
            />
          </svg>
        </label>
        <h1 className="text-center mt-10 text-[30px] font-semibold ">
          Recents
        </h1>
        <hr className="w-[60px] bg-black text-black fill-black h-[3px] self-center" />
        <div className="flex justify-between w-[90%] md:w-[50%] self-center mt-5 items-center gap-3">
          <ServicesIcon
            imageUrl="https://lh3.googleusercontent.com/a/AEdFTp65RCG22jI1p7NzSJ4G77zOwyJ6omf4jI7BjLhb=s96-c"
            redirectUrl="https://google.com"
            title="google"
          />
          <ServicesIcon
            imageUrl="https://lh3.googleusercontent.com/a/AEdFTp65RCG22jI1p7NzSJ4G77zOwyJ6omf4jI7BjLhb=s96-c"
            redirectUrl="https://google.com"
            title="google"
          />
          <ServicesIcon
            imageUrl="https://lh3.googleusercontent.com/a/AEdFTp65RCG22jI1p7NzSJ4G77zOwyJ6omf4jI7BjLhb=s96-c"
            redirectUrl="https://google.com"
            title="google"
          />
          <ServicesIcon
            imageUrl="https://lh3.googleusercontent.com/a/AEdFTp65RCG22jI1p7NzSJ4G77zOwyJ6omf4jI7BjLhb=s96-c"
            redirectUrl="https://google.com"
            title="google"
          />
        </div>
        <hr className="w-[60%] mt-5 bg-black text-black fill-black h-[1px] self-center" />
        <h1 className="text-center mt-10 text-[30px] font-semibold ">
          Available Services
        </h1>
        <hr className="w-[120px] bg-black text-black fill-black h-[3px] self-center" />
        <div className="grid grid-cols-4 md:grid-cols-9 self-center gap-5 md:gap-16 mt-5 justify-evenly">
          {[1, 2, 3, 4, 4, 5, 6, 7, 8, 9].map(() => (
            <ServicesIcon
              imageUrl="https://lh3.googleusercontent.com/a/AEdFTp65RCG22jI1p7NzSJ4G77zOwyJ6omf4jI7BjLhb=s96-c"
              redirectUrl="https://google.com"
              title="google"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
