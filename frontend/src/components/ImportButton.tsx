"use client";

type Props = {
  onImport: () => void;
  loading: boolean;
};

export default function ImportButton({
  onImport,
  loading,
}: Props) {
  return (
    <button
      onClick={onImport}
      disabled={loading}
      className="
      rounded-xl
      bg-blue-600
      px-6
      py-3
      font-semibold
      text-white
      shadow-lg
      hover:bg-blue-700
      hover:scale-105
      transition
      "
    >
      {loading ? "Importing..." : "Import with AI"}
    </button>
  );
}