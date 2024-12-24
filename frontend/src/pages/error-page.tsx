import { Link } from "react-router";
import { useEffect } from "react";
import { Maybe } from "@/lib/type/utils.ts";

interface Props {
  error: Maybe<Error>;
}

export default function ErrorPage({ error }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-white flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">Error</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Oops! Something Went Wrong</h2>
        <p className="text-xl text-gray-600 mb-8">We apologize for the inconvenience. Our team has been notified and is working on it.</p>

        <div className="space-x-4">
          <Link
            to="/"
            className="text-red-600 hover:text-red-800 transition-colors">
            Return to Homepage
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="animate-pulse">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="#FFEBEE"
          />
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="#FFCDD2"
          />
          <circle
            cx="100"
            cy="100"
            r="50"
            fill="#EF9A9A"
          />
          <path
            d="M70 110 Q100 80 130 110"
            stroke="#FFFFFF"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="70"
            cy="80"
            r="10"
            fill="#FFFFFF"
          />
          <circle
            cx="130"
            cy="80"
            r="10"
            fill="#FFFFFF"
          />
        </svg>
      </div>
    </div>
  );
}
