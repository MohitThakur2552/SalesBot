export default function Transcript({ transcript }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 h-[300px] overflow-y-auto">

      <h2 className="font-bold text-xl mb-4">
        Conversation
      </h2>

      {transcript.map((item, index) => (
        <div
          key={index}
          className={`mb-4 ${
            item.role === "user"
              ? "text-right"
              : "text-left"
          }`}
        >
          <div
            className={`inline-block px-4 py-2 rounded-xl max-w-[80%] ${
              item.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <strong>
              {item.role === "user" ? "You" : "Customer"}
            </strong>

            <br />

            {item.message}
          </div>
        </div>
      ))}
    </div>
  );
}