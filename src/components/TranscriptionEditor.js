import TranscriptionItem from "./TranscriptionItem";

export default function TranscriptionEditor({
  awsTranscriptionItems,
  setAwsTranscriptionItems,
}) {
  function updateTranscriptionItem(index, prop, ev) {
    const newAwsItems = [...awsTranscriptionItems];
    const newItem = { ...newAwsItems[index] };
    newItem[prop] = ev.target.value;
    newAwsItems[index] = newItem;
    setAwsTranscriptionItems(newAwsItems);
  }

  return (
    <div className="border border-gray-300 rounded-md w-full ">
      {/* Table Headers (Fixed) */}
      <div className="grid grid-cols-3 bg-gray-200 p-2 font-semibold text-black">
        <div>From</div>
        <div>End</div>
        <div>Content</div>
      </div>

      {/* Scrollable Table Content */}
      <div className="h-[550px] w-auto overflow-y-auto custom-scrollbar">
        {awsTranscriptionItems.map((item, key) => (
          <TranscriptionItem
            key={key}
            handleStartTimeChange={(ev) =>
              updateTranscriptionItem(key, "start_time", ev)
            }
            handleEndTimeChange={(ev) =>
              updateTranscriptionItem(key, "end_time", ev)
            }
            handleContentChange={(ev) =>
              updateTranscriptionItem(key, "content", ev)
            }
            item={item}
          />
        ))}
      </div>
    </div>
  );
}
