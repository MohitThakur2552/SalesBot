export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl px-10 py-8 flex flex-col items-center shadow-xl">

        <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

        <h2 className="mt-6 text-xl font-semibold">
          AI is Evaluating Your Meeting
        </h2>

        <p className="text-gray-500 mt-2 text-center">
          Please wait while we generate your sales performance report...
        </p>

      </div>
    </div>
  );
}