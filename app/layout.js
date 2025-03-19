"use client";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import { UpdateCartContext } from "./_context/UpdateCartContext";
import { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const params = usePathname();
  const [updateCart, setUpdateCart] = useState(false);
  const showHeader = params !== "/sign-in" && params !== "/create-account";

  useEffect(() => {
    const razorpayScript = document.createElement("script");
    razorpayScript.src = "https://checkout.razorpay.com/v1/checkout.js";
    razorpayScript.async = true;
    document.body.appendChild(razorpayScript);

    const botpressScript = document.createElement("script");
    botpressScript.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    botpressScript.async = true;
    document.body.appendChild(botpressScript);

    const contentScript = document.createElement("script");
    contentScript.src = "https://files.bpcontent.cloud/2024/11/11/05/20241111054918-KOKWWYPN.js";
    contentScript.async = true;
    document.body.appendChild(contentScript);

    botpressScript.onload = () => {
      if (window.botpressWebChat) {
        window.botpressWebChat.init({
          hostUrl: "https://cdn.botpress.cloud/webchat/v2.2",
          botId: "6e0310f2-517c-4567-99a8-a9a5f5e055da",
        });

        window.botpressWebChat.onLoad(() => {
          window.botpressWebChat.sendEvent({ type: 'show' });
        });
      }
    };

    return () => {
      document.body.removeChild(razorpayScript);
      document.body.removeChild(botpressScript);
      document.body.removeChild(contentScript);
    };
  }, []);

  return (
    <html lang="en">
      <body className={outfit.className}>
        <SessionProvider>
          <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
            {showHeader && <Header />}
            {children}
            <Toaster />
          </UpdateCartContext.Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
// "use client";
// import { Outfit } from "next/font/google";
// import "./globals.css";
// import Header from "./_components/Header";
// import { Toaster } from "@/components/ui/sonner";
// import { usePathname } from "next/navigation";
// import { UpdateCartContext } from "./_context/UpdateCartContext";
// import { useState, useEffect } from "react";
// import { SessionProvider } from "next-auth/react";
// import Script from "next/script";  // ✅ Use next/script

// const outfit = Outfit({ subsets: ["latin"] });

// export default function RootLayout({ children }) {
//   const params = usePathname();
//   const [updateCart, setUpdateCart] = useState(false);
//   const showHeader = params !== "/sign-in" && params !== "/create-account";

//   useEffect(() => {
//     if (window.botpressWebChat) {
//       window.botpressWebChat.init({
//         hostUrl: "https://cdn.botpress.cloud/webchat/v2.2",
//         botId: "6e0310f2-517c-4567-99a8-a9a5f5e055da",
//       });

//       window.botpressWebChat.onLoad(() => {
//         window.botpressWebChat.sendEvent({ type: 'show' });
//       });
//     }
//   }, []);

//   return (
//     <html lang="en">
//       <body className={outfit.className}>
//         {/* ✅ Use Next.js optimized script loading */}
//         <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
//         <Script src="https://cdn.botpress.cloud/webchat/v2.2/inject.js" strategy="lazyOnload" />
//         <Script src="https://files.bpcontent.cloud/2024/11/11/05/20241111054918-KOKWWYPN.js" strategy="lazyOnload" />

//         <SessionProvider>
//           <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
//             {showHeader && <Header />}
//             {children}
//             <Toaster />
//           </UpdateCartContext.Provider>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }
