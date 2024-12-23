import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Oops! Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">The page you're looking for seems to have taken an unexpected day off.</p>

        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 transition-colors">
          Return to Homepage
        </Link>
      </div>

      <div className="mt-12">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="animate-float">
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="#E6F0FF"
          />
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="#B3D4FF"
          />
          <circle
            cx="100"
            cy="100"
            r="50"
            fill="#80B3FF"
          />
          <path
            d="M70 90 Q100 120 130 90"
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
