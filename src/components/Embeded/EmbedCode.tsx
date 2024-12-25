'use client'
import React, { useState } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { BASE_URL } from "@/config/utils";

const EmbedCode: React.FC = () => {
  const [protocol, setProtocol] = useState("https");
  const [url, setUrl] = useState("");
  const [label, setLabel] = useState("Click Here");
  const [embedCode, setEmbedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const generateEmbedCode = () => {
    const fullUrl = `${protocol}://${url}`;
    const embedScript = `
      <script src="${BASE_URL}/script.js" 
              id="dynamic-embed" 
              button-label="${label}" 
              redirect-url="${fullUrl}">
      </script>
    `;
    setEmbedCode(embedScript);
    setCopied(false); // Reset copied state after generating new code
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="mx-auto max-w-7xl p-4 h-screen">
      {/* Breadcrumb */}
      <Breadcrumb pageName="Generate Embed Code" />

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
          Embed Code Generator
        </h2>

        {/* Protocol Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 dark:text-gray-300">
            Protocol
          </label>
          <select
            value={protocol}
            onChange={(e) => setProtocol(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-800 dark:border-strokedark dark:bg-boxdark dark:text-white"
          >
            <option value="http">http</option>
            <option value="https">https</option>
          </select>
        </div>

        {/* URL Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 dark:text-gray-300">
            URL for Redirection
          </label>
          <input
            type="text"
            placeholder="Enter URL (without protocol)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-800 dark:border-strokedark dark:bg-boxdark dark:text-white"
          />
        </div>

        {/* Button Label Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2 dark:text-gray-300">
            Button Label
          </label>
          <select
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-800 dark:border-strokedark dark:bg-boxdark dark:text-white"
          >
            <option value="Click Here">Click Here</option>
            <option value="Learn More">Learn More</option>
            <option value="Download Now">Download Now</option>
          </select>
        </div>

        {/* Generate and Display Embed Code */}
        <button
          onClick={generateEmbedCode}
          className="w-full bg-primary text-white p-2 rounded hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary mb-4"
        >
          Generate Embed Code
        </button>

        {/* Display Generated Embed Code with Copy Feature */}
        {embedCode && (
          <div className="mt-6 relative">
            <label className="block text-gray-700 font-medium mb-2 dark:text-gray-300">
              Embed Code
            </label>
            <textarea
              readOnly
              value={embedCode}
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-800 dark:border-strokedark dark:bg-boxdark dark:text-white"
              rows={6}
            />
            <button
              onClick={copyToClipboard}
              className="absolute right-6 top-10 bg-gray-700 text-sm px-3 py-1 rounded text-white hover:bg-gray-600 dark:bg-meta-4 dark:hover:bg-meta-3"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmbedCode;
