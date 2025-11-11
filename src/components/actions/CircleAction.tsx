import { useRef, useState } from "react";
import CircleGIF from "../../assets/circle.gif";
import { ActionItemBase } from "../ActionList";

export function CircleAction() {
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const onClick = async () => {
    setModalOpen(true);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.error(err);
      setError("Не удалось получить доступ к камере");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  return (
    <>
      <ActionItemBase
        id="camera"
        title="Заготовка для кружка как в телеге"
        description="Просто откроется камера в модальном окне"
        imageUrl={CircleGIF}
        onClick={onClick}
      />
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-md relative max-w-lg w-full">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-700 font-bold"
            >
              ✕
            </button>
            {error ? (
              <div className="text-red-600">{error}</div>
            ) : (
              <video ref={videoRef} className="w-full rounded-md" />
            )}
          </div>
        </div>
      )}
    </>
  );
}
