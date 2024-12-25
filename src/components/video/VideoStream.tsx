interface VideoStreamProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isSelf?: boolean;
  isMainStream?: boolean;
  label?: string;
}

const VideoStream = ({ videoRef, isSelf = false, isMainStream = false, label }: VideoStreamProps) => {
  return (
    <div className={`relative rounded-3xl overflow-hidden bg-black/5 ${isMainStream ? 'md:col-span-2' : ''}`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isSelf}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-6 left-6 px-6 py-2.5 bg-black/30 backdrop-blur-xl rounded-full">
        <span className="text-white text-sm font-medium">
          {label}
        </span>
      </div>
    </div>
  );
};

export default VideoStream;