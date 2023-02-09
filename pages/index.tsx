import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import { EventHandler, FormEventHandler, useState } from "react";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [usernameKeyword, setusernameKeyword] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push("/search?username=" + usernameKeyword);
  };

  return (
    <>
      <Head>
        <title>Github Kali</title>
        <meta name="description" content="Github Kali is clone from github" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="home-page">
          <div className="home-page__background">
            <Image
              src="https://github.githubassets.com/images/modules/site/home-campaign/hero-bg-2x.webp"
              alt="background hero"
              fill
            ></Image>
          </div>
          <div className="home-page__hero">
            <h1 className="home-page__hero__title">Search Github Users</h1>
            <h2 className="home-page__hero__sub">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </h2>
            <div className="home-page__hero__search">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  className="home-page__hero__search__input"
                  placeholder="Github username"
                  onChange={(e) => setusernameKeyword(e.target.value)}
                />
                <button
                  type="submit"
                  className="home-page__hero__search__button"
                >
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
