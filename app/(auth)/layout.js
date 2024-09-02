import Image from "next/image";
import "../globals.css";

export const metadata = {
  title: "Authentications",
  description: "Social-Media Auth page",
};

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-orange-200 flex items-center justify-center">
      <div className=' min-h-[85vh] w-[90%] shadow-[0px_4px_32.3px_0px_rgba(0,0,0,0.07)] flex overflow-hidden rounded-[20px];
   bg-white '>
        <div className="flex-[1.1] flex items-center justify-center">
          {children}
        </div>
        <div className="flex-[0.9] flex items-center justify-center bg-[#f9aa11]">
          <Image src={'/'} alt="kar-auth" quality={100} width={400} height={400} />
        </div>
      </div>
    </div>
  );
}
