import TypewriterPage from "@/components/TypewriterPage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-200 to-lime-200">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-semibold text-center  text-6xl">
          Take better{" "}
          <span className="font-bold text-lime-600"> Notes with</span> the power
          of {"AI"}
        </h1>
        <h2 className="font-semibold text-3xl text-center text-slate-700 mt-4">
          <TypewriterPage />
        </h2>
        <div className="mt-8 flex justify-center">
          <Link href="/dashboard">
            <Button className="bg-green-600">Start Taking Notes! 📝</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
