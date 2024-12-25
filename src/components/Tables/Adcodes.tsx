import React from 'react';

const AdCodes = ({ handleModal, redirects, handleClick }: { handleModal: any, redirects: any, handleClick: any }) => {

  return (
    <div className="container mx-auto p-4">
      {/* Table Header */}
      <div className="flex justify-end items-center py-4 mb-6" onClick={handleModal} >
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-md">
          + Create New Ad Code
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-300">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Site Name</th>
              <th className="px-6 py-3">Site</th>
              <th className="px-6 py-3">Code</th>
            </tr>
          </thead>
          <tbody>
            {redirects?.length === 0 ?
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colSpan={5} className="px-6 py-4 text-center ">No Data Available
                </td>
              </tr>

              : redirects?.map((redirect: any) => (
                <tr key={redirect.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-4">{redirect.id}</td>
                  <td className="px-6 py-4">{redirect.name}</td>
                  <td className="px-6 py-4">{redirect.siteName}</td>
                  <td className="px-6 py-4">{redirect.targeted_site}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2" onClick={() => handleClick(redirect.id)} >
                      {/* Action buttons with Font Awesome icons */}
                      <button className="text-green-600 hover:text-green-800">
                        <i className="fas fa-code"></i>
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdCodes;
