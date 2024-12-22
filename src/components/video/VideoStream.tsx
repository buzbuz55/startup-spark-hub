interface VideoStreamProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isSelf?: boolean;
}

const VideoStream = ({ videoRef, isSelf = false }: VideoStreamProps) => {
  return (
    <div className="relative">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isSelf}
        className="w-full rounded-lg bg-black"
      />
      <span className="absolute bottom-2 left-2 text-white text-sm bg-black/50 px-2 py-1 rounded">
        {isSelf ? "You" : "Remote User"}
      </span>
    </div>
  );
};

export default VideoStream;