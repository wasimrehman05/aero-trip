import Head from "next/head";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { SideBar } from "@/components/SideBar/SideBar";
import "@/app/globals.css";


function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const currentRoute =
        router.pathname === "/"
            ? "Home"
            : router.pathname
                  .slice(1) // Remove the leading slash
                  .replace(/-/g, " ") // Optional: Replace hyphens with spaces if needed
                  .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

    const titleName = `${currentRoute} - Aero Trip`;

    return (
        <>
            <Head>
                <title>{titleName}</title>
                <meta
                    name="description"
                    content="Explore various trips and destinations on Aero Trip."
                />
            </Head>
            <Header />
            <main className="content">
                <div className="side_tab">
                    <SideBar />
                </div>
                <div className="main_tab">
                    <Component {...pageProps} />
                </div>
            </main>
            <Footer />
        </>
    );
}

export default MyApp;
