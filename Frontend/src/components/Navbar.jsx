import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm border-b">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          SalesPilot AI
        </Link>

        <nav className="flex gap-8">

          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Home
          </Link>

          {/* <Link
            to="/meeting"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Meeting
          </Link>

          <Link
            to="/result"
            className="text-gray-600 hover:text-blue-600 transition"
          >
            Result
          </Link> */}

        </nav>

      </div>

    </header>
  );
}