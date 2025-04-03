export default function GradientBackground() {
    return (
        <div className="absolute -z-10 inset-0 overflow-hidden opacity-7">
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black" />
            <div className="absolute inset-0">
                <div className="absolute top-[-40%] right-[25%] w-[800px] h-[800px] bg-indigo-500 rounded-full blur-3xl [animation:blob_7s_infinite,float_20s_ease-in-out_infinite]" />
                {/* <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-blue-700 rounded-full blur-3xl [animation:blob_7s_infinite_4s,float_20s_ease-in-out_infinite_-10s]" /> */}
                {/* <div className="absolute top-[20%] right-[-10%] w-[700px] h-[700px] bg-blue-800/70 rounded-full blur-3xl [animation:blob_7s_infinite_6s,float_20s_ease-in-out_infinite_-15s]" /> */}
            </div>
        </div>
    );
}
