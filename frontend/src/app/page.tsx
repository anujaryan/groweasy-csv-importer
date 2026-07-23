"use client";

import { useState } from "react";
import UploadBox from "../components/UploadBox";
import Previewtable from "../components/Previewtable";
import ImportButton from "../components/ImportButton";
import Card from "../components/Card";
import ImportedTable from "../components/ImportedTable";
import { api } from "../services/api";

interface ImportResponse {
  totalRecords: number;
  imported: any[];
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [importedData, setImportedData] =
    useState<ImportResponse | null>(null);
  const [importing, setImporting] = useState(false);

  async function handleFile(file: File) {
    setFile(file);

    // Reset previous data
    setImportedData(null);
    setHeaders([]);
    setRows([]);

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/preview", formData);

      setHeaders(res.data.headers);
      setRows(res.data.preview);
    } catch (err) {
      console.error(err);
      alert("Preview failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleImport() {
    if (!file) return;

    setImporting(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/import", formData);
      setImportedData(res.data);
    } catch (err) {
      console.error(err);
      alert("Import failed");
    } finally {
      setImporting(false);
    }
  }

  function downloadJSON() {
    if (!importedData) return;

    const blob = new Blob(
      [JSON.stringify(importedData.imported, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "crm-data.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  function reset() {
    setFile(null);
    setHeaders([]);
    setRows([]);
    setImportedData(null);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-10">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-2 text-5xl font-extrabold text-white">
          🤖 AI CSV Importer
        </h1>

        <p className="mb-10 text-lg text-slate-300">
          Upload, Preview and Import CSV files into your CRM using AI.
        </p>

        <UploadBox onFileSelect={handleFile} />

        {file && (
  <div className="mt-6 flex items-center justify-between rounded-2xl border border-blue-500 bg-slate-800/80 p-5 shadow-xl backdrop-blur-md">
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-2xl">
        📄
      </div>

      <div>
        <p className="text-sm text-slate-400">
          Selected File
        </p>

        <h3 className="text-lg font-semibold text-white">
          {file.name}
        </h3>

        <p className="text-sm text-slate-500">
          {(file.size / 1024).toFixed(2)} KB
        </p>
      </div>
    </div>

    <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm font-medium text-green-400">
      Ready ✓
    </span>
  </div>
)}

        {loading && (
          <p className="mt-6 text-lg font-semibold text-blue-600">
            ⏳ Loading Preview...
          </p>
        )}

        {rows.length > 0 && (
          <>
            <Card title="CSV Preview">
              <Previewtable
                headers={headers}
                rows={rows}
              />
            </Card>

            <div className="mt-6 flex justify-end">
              <ImportButton
                onImport={handleImport}
                loading={importing}
              />
            </div>
          </>
        )}

        {importedData && (
          <>
            <div className="mt-8 mb-6 rounded-lg border border-green-300 bg-green-100 p-4">
              <h2 className="text-xl font-bold text-green-700">
                ✅ Import Completed Successfully
              </h2>
            </div>

            <Card title="Import Summary">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                <div className="rounded-2xl border border-slate-600 bg-slate-800 p-6 text-center shadow-lg hover:scale-105 transition">
                  <p className="text-slate-300">📄 Total Records</p>
                  <h2 className="mt-2 text-4xl font-bold text-white">
                    {importedData.totalRecords}
                  </h2>
                </div>

                <div className="rounded-2xl border border-green-600 bg-green-900/30 p-6 text-center shadow-lg hover:scale-105 transition">
                  <p className="text-green-300">✅ Imported</p>
                  <h2 className="mt-2 text-4xl font-bold text-green-400">
                    {importedData.imported.length}
                  </h2>
                </div>

                <div className="rounded-2xl border border-red-600 bg-red-900/30 p-6 text-center shadow-lg hover:scale-105 transition">
                  <p className="text-red-300">❌ Failed</p>
                  <h2 className="mt-2 text-4xl font-bold text-red-400">
                    {importedData.totalRecords - importedData.imported.length}
                  </h2>
                </div>

              </div>
            </Card>

            <Card title="Imported CRM Records">
              <ImportedTable
                data={importedData.imported}
              />
            </Card>

            <div className="mt-6 flex flex-wrap gap-4">

              <button
                onClick={downloadJSON}
                className="rounded-lg bg-green-600 px-5 py-3 font-medium text-white transition hover:bg-green-700"
              >
                ⬇ Download JSON
              </button>

              <button
                onClick={reset}
                className="rounded-lg bg-gray-600 px-5 py-3 font-medium text-white transition hover:bg-gray-700"
              >
                📂 Upload Another File
              </button>

            </div>
          </>
        )}

      </div>
    </main>
  );
}