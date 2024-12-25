'use client'
import { db } from "@/config/firebase";
import { collection, deleteDoc, doc, endBefore, getDocs, limit, orderBy, query, startAfter, updateDoc, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const PublisherApprovalTable = () => {
  const [publishers, setPublishers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [firstVisible, setFirstVisible] = useState<any>(null);
  const [lastVisible, setLastVisible] = useState<any>(null);

  const PAGE_SIZE = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Total count query for pagination calculation
        const countQuery = query(collection(db, "users"), where("approved", "==", false));
        const countSnapshot = await getDocs(countQuery);
        const totalFalseUsers = countSnapshot.docs.length;
        setTotalPages(Math.ceil(totalFalseUsers / PAGE_SIZE));

        // Data fetching query
        let q = query(
          collection(db, "users"),
          where("approved", "==", false),
          orderBy("createdAt", "desc"),
          limit(PAGE_SIZE)
        );

        if (page > 1 && lastVisible) {
          q = query(
            collection(db, "users"),
            where("approved", "==", false),
            orderBy("createdAt", "desc"),
            startAfter(lastVisible),
            limit(PAGE_SIZE)
          );
        }

        const snapshot = await getDocs(q);
        if (snapshot.empty) {
          // console.log("No matching documents.");
          setPublishers([]);
        } else {
          const publishersData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPublishers(publishersData);
          setFirstVisible(snapshot.docs[0]);
          setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        }
      } catch (error) {
        console.error("Error fetching publishers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  // console.log(publishers)


  const handleNextPage = async () => {
    if (page < totalPages && lastVisible) {
      setPage(page + 1);
      const nextPageQuery = query(
        collection(db, "users"),
        where("approved", "==", false),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(PAGE_SIZE)
      );
      const snapshot = await getDocs(nextPageQuery);
      const publishersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPublishers(publishersData);
      setFirstVisible(snapshot.docs[0]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    }
  };

  const handlePreviousPage = async () => {
    if (page > 1 && firstVisible) {
      setPage(page - 1);
      const prevPageQuery = query(
        collection(db, "users"),
        where("approved", "==", false),
        orderBy("createdAt", "desc"),
        endBefore(firstVisible),
        limit(PAGE_SIZE)
      );
      const snapshot = await getDocs(prevPageQuery);
      const publishersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPublishers(publishersData);
      setFirstVisible(snapshot.docs[0]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    }
  };


  const handleActionClick = async (id: string, action: boolean) => {
    const userDoc = doc(db, "users", id);

    try {
      if (action) {
        // Update the document to set approved to true
        await updateDoc(userDoc, { approved: true });

        // Optionally trigger UI changes or animations
        // console.log("User approved successfully");
      } else {
        // Delete the document
        await deleteDoc(userDoc);

        // Optionally trigger UI changes or animations
        // console.log("User deleted successfully");
      }

      // Handle the UI update to reflect the changes
      setPublishers(prev => prev.filter(publisher => publisher.id !== id));

    } catch (error) {
      console.error("Failed to update or delete publisher:", error);
    }
  };


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">S.No</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center py-4">Loading...</td>
            </tr>
          ) : publishers.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-4">No data available</td>
            </tr>
          ) : (
            publishers.map((publisher, index) => (
              <tr key={publisher.id} className={`transition-opacity duration-300 ${publisher.isRemoving ? 'opacity-0' : 'opacity-100'}`}>
                <td className="px-6 py-4">{(page - 1) * PAGE_SIZE + index + 1}</td>
                <td className="px-6 py-4">{publisher.fullName}</td>
                <td className="px-6 py-4">{publisher.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold ${publisher.approved ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {publisher.approved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleActionClick(publisher.id, true)}
                    className="px-4 py-2 m-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleActionClick(publisher.id, false)}
                    className="ml-2 px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    &nbsp; Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          &nbsp; Showing <span className="font-semibold text-gray-900 dark:text-white">{(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, totalPages * PAGE_SIZE)}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalPages * PAGE_SIZE}</span>
        </span>
        <div className="m-2">
          <ul className="inline-flex -space-x-px rtl:space-x-reverse">
            <li>
              <button
                onClick={handlePreviousPage}
                disabled={page === 1}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, idx) => (
              <li key={idx}>
                <button
                  onClick={() => setPage(idx + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${page === idx + 1 ? 'text-blue-600 border border-gray-300 bg-blue-50' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100'}`}
                >
                  {idx + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={handleNextPage}
                disabled={page === totalPages}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default PublisherApprovalTable;

