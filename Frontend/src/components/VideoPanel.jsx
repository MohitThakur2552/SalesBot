import Webcam from "react-webcam";

export default function VideoPanel() {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg h-[350px] flex items-center justify-center">

      <Webcam
        audio={false}
        mirrored
        className="w-full h-full object-cover"
      />

    </div>
  );
}