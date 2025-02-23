"use client";
import ResultVideo from "@/components/ResultVideo";
import TranscriptionEditor from "@/components/TranscriptionEditor";
import { clearTranscriptionItems } from "@/libs/awsTranscriptionHelpers";
import axios from "axios";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Header from "@/components/Header";

export default function FilePage({ params }) {
  const filename = params.filename;
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);
  const [awsTranscriptionItems, setAwsTranscriptionItems] = useState([]);

  useEffect(() => {
    getTranscription();
  }, [filename]);

  function getTranscription() {
    setIsFetchingInfo(true);
    axios
      .get("/api/transcribe?filename=" + filename)
      .then((response) => {
        setIsFetchingInfo(false);
        const status = response.data?.status;
        const transcription = response.data?.transcription;

        if (status === "IN_PROGRESS") {
          setIsTranscribing(true);
          setTimeout(getTranscription, 3000);
        } else {
          setIsTranscribing(false);

          // ✅ Check if transcription and results exist before accessing items
          if (transcription?.results?.items) {
            setAwsTranscriptionItems(
              clearTranscriptionItems(transcription.results.items)
            );
          } else {
            console.warn(
              "Transcription data is missing or incomplete:",
              transcription
            );
            setAwsTranscriptionItems([]); // Set empty array to prevent errors
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching transcription:", error);
        setIsFetchingInfo(false);
      });
  }

  if (isFetchingInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
        <Loader2 className="w-12 h-12 animate-spin text-[#9AE66E]" />
        <h2 className="mt-4 text-xl font-semibold">Fetching Information...</h2>
        <p className="text-gray-500">Please wait while we gather details.</p>
      </div>
    );
  }

  if (isTranscribing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
        <h2 className="text-2xl font-semibold">Transcribing Your Video</h2>
        <p className="text-gray-500 mb-4">This may take a few moments.</p>
        <div className="w-80 h-5 bg-gray-300 animate-pulse rounded-md" />
        <div className="w-64 h-5 bg-gray-300 animate-pulse rounded-md mt-2" />
        <div className="w-72 h-5 bg-gray-300 animate-pulse rounded-md mt-2" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="p-8 bg-white min-h-screen">
        <div className="grid sm:grid-cols-2 gap-8 sm:gap-16">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Transcription Editor
            </h2>
            <h4 className="text-md font-semibold text-gray-500 mb-4">
              Captions are editable. Click on a caption to modify it.
            </h4>
            <TranscriptionEditor
              awsTranscriptionItems={awsTranscriptionItems}
              setAwsTranscriptionItems={setAwsTranscriptionItems}
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Result Video
            </h2>
            <ResultVideo
              filename={filename}
              transcriptionItems={awsTranscriptionItems}
            />
          </div>
        </div>
      </div>
    </>
  );
}
