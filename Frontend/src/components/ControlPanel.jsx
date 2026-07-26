export default function ControlPanel({
  meetingStatus,
  onStartListening,
  onEndMeeting,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 flex justify-center gap-5">

      <button
        onClick={onStartListening}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
      >
        🎤 Start
      </button>

      <button
        onClick={onEndMeeting}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
      >
        📞 End Meeting
      </button>

      <span className="self-center font-medium">
        {meetingStatus}
      </span>

    </div>
  );
}