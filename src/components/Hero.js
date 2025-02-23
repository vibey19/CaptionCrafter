"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UploadIcon from "@/components/UploadIcon";
import axios from "axios";

const Hero = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(""); // Upload Status

  async function upload(ev) {
    ev.preventDefault();
    const files = ev.target.files;
    if (files.length > 0) {
      const file = files[0];
      setIsUploading(true);
      setUploadMessage("");
      try {
        const res = await axios.postForm("/api/upload", { file });
        setIsUploading(false);
        setUploadMessage("Upload successful! 🎉");
        const newName = res.data.newName;
        router.push("/" + newName);
      } catch (error) {
        setIsUploading(false);
        setUploadMessage("Upload failed. Please try again. ❌");
      }
    }
  }

  return (
    <section className="bg-white text-gray-900 py-24 flex items-center justify-center overflow-hidden">
      <div className="text-center max-w-3xl px-6">
        <button className="mb-8 rounded-full text-sm tracking-wide bg-gray-900 text-white px-5 py-2 hover:bg-gray-700 transition">
          See What&apos;s New |{" "}
          <span className="text-[#9AE66E]">AI Captions</span>
        </button>

        <h1 className="text-2xl font-extrabold sm:text-5xl leading-tight bg-gradient-to-r from-[#9AE66E] via-gray-900 to-black bg-clip-text text-transparent">
          Upload. Generate. Edit.
          <span className="sm:block"> Your AI-Powered Caption Studio. </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-gray-600 sm:text-lg">
          CaptionCrafter is your go-to AI-powered platform for generating
          instant captions. Upload your video, get accurate subtitles, and edit
          them effortlessly with our intuitive caption editor.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <label className="px-14 py-4 text-sm font-semibold bg-[#9AE66E] text-gray-900 hover:bg-[#82d358] transition rounded-lg cursor-pointer inline-flex items-center gap-2 border-1 border-black">
            <UploadIcon />
            <span>{isUploading ? "Uploading..." : "Upload Video"}</span>
            <input onChange={upload} type="file" className="hidden" />
          </label>

          <button
            onClick={() => router.push("/pricing")}
            className="px-14 py-4 text-sm font-semibold border border-[#9AE66E] text-gray-900 hover:bg-gray-100 transition rounded-lg"
          >
            Learn More
          </button>
        </div>

        {/* Upload Status Message */}
        {uploadMessage && (
          <p
            className={`text-sm mt-2 ${
              uploadMessage.includes("failed")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {uploadMessage}
          </p>
        )}
      </div>
    </section>
  );
};

export default Hero;
