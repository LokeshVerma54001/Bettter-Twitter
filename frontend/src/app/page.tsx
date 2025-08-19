"use client"

import ForYouPage from "../components/ForYouPage";
import HomeExtras from "../components/HomeExtras";
import ProtectPage from "../components/ProtectPage";

export default function Home() {
  return (
    <ProtectPage>
      <div className=" flex w-full h-screen">
        <ForYouPage />
        <HomeExtras />
      </div>
    </ProtectPage>
  );
}
