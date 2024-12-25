'use client';

import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "@/context/UserContext";
import { useSearchParams } from "next/navigation";

const Publishers = () => {
  const { user } = useUser(); // Authenticated user
  const [userDomain, setUserDomain] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const codeUid: any = searchParams.get("codeUid")
  const [codeData, setCodeData] = useState<any>(null);
  // Button settings
  const [buttonSettings, setButtonSettings] = useState({
    name: "Download Now",
    fontSize: 16,
    fontColor: "#FFFFFF",
    backgroundColor: "#000000",
    fontWeight: "normal",
  });


  useEffect(() => {
    const fetchCode = async () => {
      setLoading(true);
      try {
        if (user?.uid) {
          const userRef = doc(db, "websites", codeUid); // Firestore reference
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const codeData = userSnap.data();
            setCodeData(codeData);
            // const domain = userData?.domain; // Assuming 'domain' field exists
            // setUserDomain(domain || null);
          } else {
            console.warn("No such document for user!");
          }
        }
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      } finally {
        setLoading(false);
      }
      console.log(userDomain)
    };
    fetchCode();
  }, [codeUid]);

  // Fetch Firestore user data and extract the domain
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        if (user?.uid) {
          const userRef = doc(db, "users", user.uid); // Firestore reference
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            const domain = userData?.domain; // Assuming 'domain' field exists
            setUserDomain(domain || null);
          } else {
            console.warn("No such document for user!");
          }
        }
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user?.uid]);

  // Handle changes for button settings
  const handleInputChange = (key: string, value: string) => {
    setButtonSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Generate URLs
  const queryParams = `?data-user=${user?.uid}`;
  const redirectScriptURL = userDomain ? `https://${userDomain}/redirect.js${queryParams}` : "";
  const smartLinkURL = userDomain ? `https://${userDomain}/${queryParams}` : "";

  // Copy to clipboard functionality
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => alert("Copied to clipboard!"),
      (err) => console.error("Failed to copy: ", err)
    );
  };

  const handleCopyCode = () => {
    const codeToCopy = `<script>
(function(){
  'use strict';
  let clicksCount = 0;
  const urlToOpen = "${smartLinkURL}";
  document.addEventListener('click', function(event) {
    if (clicksCount < 1) {
      event.preventDefault();
      window.open(urlToOpen, '_blank');
      clicksCount++;
    }
  });
})();
</script>>`;

    navigator.clipboard.writeText(codeToCopy).then(() => {
      alert('Embed code copied to clipboard!');
    }).catch((err) => {
      alert('Failed to copy code: ' + err);
    });
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Websites" />

      <div className="min-h-screen p-6">
        {loading ? (
          <div className="text-center">Loading user data...</div>
        ) : (
          <>
            {/* Meta Section */}
            <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 mb-6">
              <p className="font-bold">
                Hi! Users with high traffic are advised to ask their manager for dedicated ad domains.
              </p>
              <p>
                You must add this meta tag in your site's head section for security:
              </p>
              <code className="block mt-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-gray-200 p-2 rounded">
                &lt;meta name="referrer" content="no-referrer" /&gt;
              </code>
            </div>

            {/* Button Preview Section */}
            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-4 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">Button Preview</h3>
              <button
                className="flex mt-4 px-5 py-2 rounded shadow"
                style={{
                  fontSize: `${buttonSettings.fontSize}px`,
                  color: buttonSettings.fontColor,
                  backgroundColor: buttonSettings.backgroundColor,
                  fontWeight: buttonSettings.fontWeight,
                }}
              >
                {buttonSettings.name}
              </button>
            </div>

            {/* Button Settings Section */}
            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-4 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">Button Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-gray-900 dark:text-white">Button Name</label>
                  <input
                    type="text"
                    value={buttonSettings.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 dark:text-white">Font Size (PX)</label>
                  <input
                    type="number"
                    value={buttonSettings.fontSize}
                    onChange={(e) => handleInputChange("fontSize", e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 dark:text-white">Font Color</label>
                  <input
                    type="color"
                    value={buttonSettings.fontColor}
                    onChange={(e) => handleInputChange("fontColor", e.target.value)}
                    className="w-12 h-12 border-none cursor-pointer p-0 bg-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 dark:text-white">Background Color</label>
                  <input
                    type="color"
                    value={buttonSettings.backgroundColor}
                    onChange={(e) => handleInputChange("backgroundColor", e.target.value)}
                    className="w-12 h-12 border-none cursor-pointer p-0 bg-transparent"
                  />
                </div>

                {/* Font Weight Settings */}
                <div>
                  <label className="block text-gray-900 dark:text-white">Font Weight</label>
                  <select
                    value={buttonSettings.fontWeight}
                    onChange={(e) => handleInputChange("fontWeight", e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                  >
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                  </select>
                </div>

                {/*  Side URL  */}
                <div>
                  <label className="block text-gray-900 dark:text-white">Site</label>
                  <input
                    disabled
                    type="text"
                    value={codeData?.targeted_site}
                    // onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full mt-1 p-3 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* WordPress Button Code */}
            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-4 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">WordPress Button Code</h3>
              <textarea
                readOnly
                value={`<center>
    <style>
        .buttonPress {
            font-size: ${buttonSettings.fontSize}px;
            color: ${buttonSettings.fontColor};
            background-color: ${buttonSettings.backgroundColor};
            font-weight: ${buttonSettings.fontWeight};
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
    <button class="buttonPress">${buttonSettings.name}</button>
    <script data-async="false" async type="text/javascript" src="${redirectScriptURL}"></script>
</center>`}
                className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                rows={10}
              />
              <button
                onClick={() =>
                  handleCopy(
                    `<center>
    <style>
        .buttonPress {
            font-size: ${buttonSettings.fontSize}px;
            color: ${buttonSettings.fontColor};
            background-color: ${buttonSettings.backgroundColor};
            font-weight: ${buttonSettings.fontWeight};
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
    <button class="buttonPress">${buttonSettings.name}</button>
    <script data-async="false" async type="text/javascript" src="${redirectScriptURL}"></script>
</center>`
                  )
                }
                className="mt-2 bg-blue-500 text-white p-3 rounded shadow-md"
              >
                Copy to Clipboard
              </button>
            </div>

            {/* Smart Link Section */}
            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-4 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">Smart Link</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Copy the smart link below for tracking:
              </p>
              <textarea
                readOnly
                value={smartLinkURL || "No domain available"}
                className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                rows={1}
              />
              <button
                onClick={() => handleCopy(smartLinkURL || '')}
                className="mt-2 bg-blue-500 text-white p-3 rounded shadow-md"
              >
                Copy Smart Link
              </button>
            </div>

            {/* Pop-Up Code Section */}
            <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md p-4 mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white">Pop-Up Embed Code</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Use the code below to embed a pop-up:
              </p>
              <textarea
                readOnly
                value={`<script>
(function(){
  'use strict';
  let clicksCount = 0;
  const urlToOpen = "${smartLinkURL}";
  document.addEventListener('click', function(event) {
    if (clicksCount < 1) {
      event.preventDefault();
      window.open(urlToOpen, '_blank');
      clicksCount++;
    }
  });
})();
</script>>`}
                className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                rows={5}
              />
              <button
                onClick={handleCopyCode}
                className="mt-2 bg-blue-500 text-white p-3 rounded shadow-md"
              >
                Copy Pop-Up Code
              </button>
            </div>


          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Publishers;
