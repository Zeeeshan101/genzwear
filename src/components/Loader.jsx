function Loader() {
  return (
    <div className="flex justify-center items-center min-h-[50vh] bg-transparent">
      <div className="relative w-14 h-14">
        {/* Outer Glow Ring */}
        <div className="absolute inset-0 border-4 border-white rounded-full animate-ping opacity-30"></div>
        
        {/* Spinning Ring */}
        <div className="absolute inset-0 border-4 border-transparent border-t-black border-b-white rounded-full animate-spin"></div>
        
        {/* Center Dot */}
        <div className="absolute inset-3 bg-black rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}

export default Loader;
