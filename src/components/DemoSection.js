export default function DemoSection() {
  return (
    <section className="text-center py-6">
      <h2 className="text-4xl font-extrabold text-black mb-3">
        Experience the Power of AI Captions
      </h2>
      <p className="text-lg text-gray-700 mb-6">
        Transform your videos with seamless and accurate AI-generated captions.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-6 mt-4 sm:mt-8 items-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-500 mb-2">
            Without Captions
          </h3>
          <div className="bg-transparent w-[240px] rounded-xl overflow-hidden border-2 border-dashed border-gray-500 p-2">
            <video
              src="https://caption-crafter.s3.us-east-1.amazonaws.com/without-captions.mp4"
              preload
              muted
              autoPlay
              loop
              className="rounded-lg"
            ></video>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-500 mb-2">
            With Captions
          </h3>
          <div className="bg-transparent w-[240px] rounded-xl overflow-hidden border-2 border-dashed border-gray-500 p-2">
            <video
              src="https://caption-crafter.s3.us-east-1.amazonaws.com/with-captions.mp4"
              preload
              muted
              autoPlay
              loop
              className="rounded-lg"
            ></video>
          </div>
        </div>
      </div>
    </section>
  );
}
