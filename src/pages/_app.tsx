import "@/styles/globals.css";
import { DM_Sans } from "next/font/google";
import { type AppType } from "next/dist/shared/lib/utils";
import "@/styles/locomotive-scroll.css";

const dmSans = DM_Sans({
  display: "swap",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div lang={"en"} className={dmSans.className}>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
