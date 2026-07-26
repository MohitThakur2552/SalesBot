import avatar from "../assets/avatar.png";

export default function AIAvatar({ status = "Idle" }) {

  const speaking = status === "Speaking";

  return (

    <div className="bg-gray-900 rounded-xl shadow-lg h-[350px] flex flex-col items-center justify-center">

      <div
        className={`rounded-full p-2 transition-all duration-500 ${
          speaking
            ? "ring-4 ring-blue-500 animate-pulse"
            : "ring-2 ring-gray-500"
        }`}
      >

        <img
          src={avatar}
          alt="AI Customer"
          className="w-40 h-40 rounded-full object-cover"
        />

      </div>

      <h2 className="text-white text-xl mt-6 font-semibold">

        AI Customer

      </h2>

      <p className="text-gray-300">

        {status}

      </p>

    </div>

  );
}