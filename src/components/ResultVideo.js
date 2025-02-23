import { useEffect, useState, useRef } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import { transcriptionItemsToSrt } from "@/libs/awsTranscriptionHelpers";
import roboto from "./../fonts/Roboto-Regular.ttf";
import openSans from "./../fonts/OpenSans-Regular.ttf";
import lato from "./../fonts/Lato-Regular.ttf";
import honk from "./../fonts/Honk-Regular.ttf";
import bangers from "./../fonts/Bangers-Regular.ttf";
import jotiOne from "./../fonts/JotiOne-Regular.ttf";
import slackey from "./../fonts/Slackey-Regular.ttf";
import galindo from "./../fonts/Galindo-Regular.ttf";
import luckiestGuy from "./../fonts/LuckiestGuy-Regular.ttf";
import mouseMemoirs from "./../fonts/MouseMemoirs-Regular.ttf";
import boogaloo from "./../fonts/Boogaloo-Regular.ttf";
import patrickHandSC from "./../fonts/PatrickHandSC-Regular.ttf";
import bungeeSpice from "./../fonts/BungeeSpice-Regular.ttf";
import chango from "./../fonts/Chango-Regular.ttf";
import bowlbyOneSC from "./../fonts/BowlbyOneSC-Regular.ttf";
import ceaserDressing from "./../fonts/CaesarDressing-Regular.ttf";
import walterTurncoat from "./../fonts/WalterTurncoat-Regular.ttf";
import coveredByYourGrace from "./../fonts/CoveredByYourGrace-Regular.ttf";
import mansalva from "./../fonts/Mansalva-Regular.ttf";
import poppins from "./../fonts/Poppins-Regular.ttf";

const fontOptions = {
  Roboto: roboto,
  "Open Sans": openSans,
  Lato: lato,
  Honk: honk,
  Bangers: bangers,
  "Joti One": jotiOne,
  Slackey: slackey,
  Galindo: galindo,
  "Luckiest Guy": luckiestGuy,
  "Mouse Memoirs": mouseMemoirs,
  Boogaloo: boogaloo,
  "Patrick Hand SC": patrickHandSC,
  "Bungee Spice": bungeeSpice,
  Chango: chango,
  "Bowlby One SC": bowlbyOneSC,
  "Ceaser Dressing": ceaserDressing,
  "Walter Turncoat": walterTurncoat,
  "Covered By Your Grace": coveredByYourGrace,
  Mansalva: mansalva,
  Poppins: poppins,
};

export default function ResultVideo({ filename, transcriptionItems }) {
  const videoUrl = "https://caption-crafter.s3.amazonaws.com/" + filename;
  const [loaded, setLoaded] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#FFFFFF");
  const [outlineColor, setOutlineColor] = useState("#000000");
  const [font, setFont] = useState("Roboto");
  const [fontSize, setFontSize] = useState(30);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.src = videoUrl;
    loadFFmpeg();
  }, []);

  const loadFFmpeg = async () => {
    const ffmpeg = ffmpegRef.current;
    const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd";
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        "application/wasm"
      ),
    });

    for (const key in fontOptions) {
      await ffmpeg.writeFile(
        `/tmp/${key.replace(" ", "-")}.ttf`,
        await fetchFile(fontOptions[key])
      );
    }

    setLoaded(true);
  };

  const toFFmpegColor = (rgb) => {
    const bgr = rgb.slice(5, 7) + rgb.slice(3, 5) + rgb.slice(1, 3);
    return "&H" + bgr + "&";
  };

  const transcode = async () => {
    setIsLoading(true);
    setProgress(0);

    const ffmpeg = ffmpegRef.current;
    const srt = transcriptionItemsToSrt(transcriptionItems);
    await ffmpeg.writeFile(filename, await fetchFile(videoUrl));
    await ffmpeg.writeFile("subs.srt", srt);

    videoRef.current.src = videoUrl;
    await new Promise((resolve) => {
      videoRef.current.onloadedmetadata = resolve;
    });

    const duration = videoRef.current.duration;
    ffmpeg.on("log", ({ message }) => {
      const regexResult = /time=([0-9:.]+)/.exec(message);
      if (regexResult?.[1]) {
        const [hours, minutes, seconds] = regexResult[1].split(":"),
          doneTotalSeconds = hours * 3600 + minutes * 60 + parseFloat(seconds);
        setProgress(doneTotalSeconds / duration);
      }
    });

    await ffmpeg.exec([
      "-i",
      filename,
      "-preset",
      "ultrafast",
      "-vf",
      `subtitles=subs.srt:fontsdir=/tmp:force_style='Fontname=${font},FontSize=${fontSize},MarginV=70,PrimaryColour=${toFFmpegColor(
        primaryColor
      )},OutlineColour=${toFFmpegColor(outlineColor)}'`,
      "output.mp4",
    ]);

    const data = await ffmpeg.readFile("output.mp4");
    videoRef.current.src = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );
    setProgress(1);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col justify-between p-4">
      {/* Controls Section (Responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <label className="flex flex-col items-start">
          Font:
          <select
            value={font}
            onChange={(ev) => setFont(ev.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md p-2 
               shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9AE66E]
               max-h-48 overflow-y-auto"
          >
            {Object.keys(fontOptions).map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col items-start">
          Font Size:
          <input
            type="number"
            min="10"
            max="50"
            value={fontSize}
            onChange={(ev) => setFontSize(ev.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
        </label>

        <label className="flex flex-col items-start">
          Primary Color:
          <input
            type="color"
            value={primaryColor}
            onChange={(ev) => setPrimaryColor(ev.target.value)}
            className="mt-1 w-28 h-10"
          />
        </label>

        <label className="flex flex-col items-start">
          Outline Color:
          <input
            type="color"
            value={outlineColor}
            onChange={(ev) => setOutlineColor(ev.target.value)}
            className="mt-1 w-28 h-10"
          />
        </label>
      </div>

      {/* Apply Captions Button */}
      <div className="mt-3">
        <button
          onClick={transcode}
          className="bg-[#9AE66E] text-black py-2 px-6 rounded-md border-2 cursor-pointer w-full"
        >
          Apply Captions
        </button>
      </div>

      {/* Video Preview Section */}
      <div className="mt-5 border-2 border-dashed border-gray-400 rounded-md p-4 relative flex items-center justify-center">
        {isLoading && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#9AE66E] border-opacity-50"></div>
            <h3 className="text-white text-lg mt-4">
              {parseInt(progress * 100)}%
            </h3>
          </div>
        )}
        <video
          ref={videoRef}
          controls
          className="flex items-center justify-center max-h-[500px] rounded-md outline-none"
        ></video>
      </div>
    </div>
  );
}
