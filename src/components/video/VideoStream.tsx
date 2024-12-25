interface VideoStreamProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isSelf?: boolean;
  isMainStream?: boolean;
  label?: string;
}

const VideoStream = ({ videoRef, isSelf = false, isMainStream = false, label }: VideoStreamProps) => {
  return (
    <div className={`relative rounded-xl overflow-hidden bg-muted ${isMainStream ? 'md:col-span-2' : ''}`}>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isSelf}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-lg">
        <span className="text-white text-sm font-medium">
          {label}
        </span>
      </div>
    </div>
  );
};

export default VideoStream;