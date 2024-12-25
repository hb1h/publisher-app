"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Adcodes from "@/components/Tables/Adcodes";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { addDoc, collection, getDocs,query,where } from "firebase/firestore";
import { db } from "@/config/firebase";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";

const Publishers = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [websites, setWebsiteData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [editingRedirect, setEditingRedirect] = useState(null);
  const router = useRouter();
  const {user} = useUser();


  useEffect(() => {
    const fetchRedirects = async () => {
      try {
        setLoading(true);
        
        // Reference to the 'websites' collection with a query
        const redirectRef = collection(db, 'websites');
        const q = query(redirectRef, where('uid', '==', user?.uid)); // Filter by user.uid
        
        const querySnapshot = await getDocs(q);
  
        const websitesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
  
        setWebsiteData(websitesData);
      } catch (error) {
        console.error('Error fetching websites:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRedirects();
  }, [refresh, user?.uid]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Ad Codes" />

      <div className="flex h-screen w-full flex-col gap-10">
        {/* <TableOne /> */}
        <AdCodeModal
          isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} setRefresh={setRefresh} refresh={refresh}
          editData={editingRedirect}
        />
        {loading ? <Loader /> : <Adcodes
          redirects={websites}
          handleModal={() => {
            setIsModalOpen(true);
            setEditingRedirect(null);
          }}
          handleClick={(uid: any) => router.push(`/websites/?codeUid=${uid}`)}
        />}
        {/* <TableTwo /> */}
        {/* <TableThree /> */}
      </div>
    </DefaultLayout>
  );
};



const AdCodeModal = ({ isOpen, onClose, setRefresh, refresh, editData }: { editData: any, isOpen: boolean; onClose: () => void, setRefresh: any, refresh: boolean }) => {
  const [name, setName] = useState('');
  const [siteName, setSiteName] = useState('');
  const [site, setSite] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, userDetails, isLoading } = useUser();
  // console.log("user", user?.uid)

  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setSiteName(editData.url);
    }
  }, [editData]);


  useEffect(() => {
    if (isOpen && !editData) {
      setName("");
      setSiteName("");
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (editData) {
        // const docRef = doc(db, 'domain', 'redirect', 'uid', editData.id);
        // await updateDoc(docRef, { name, url });
      } else {

        const uidRef = collection(db, 'websites');
        await addDoc(uidRef, {
          uid: user?.uid,
          name,
          siteName,
          targeted_site: site,
          createdAt: new Date()
        });
      }
      setName('');
      setSiteName('');
      setSite('');
      onClose();
      setRefresh(!refresh);

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={onClose} />
          <div className="relative z-50 w-[400px] rounded-lg dark:bg-gray-800 bg-white">
            <div className="p-4 border-b dark:border-gray-700 border-gray-200">
              <h2 className="text-lg font-semibold dark:text-white text-gray-900">
                {editData ? 'Edit Domain' : 'Create Ad Code'}
              </h2>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block mb-2 text-sm dark:text-gray-200 text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white
                           bg-white border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm dark:text-gray-200 text-gray-700">
                  Site Name
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white
                           bg-white border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm dark:text-gray-200 text-gray-700">
                  Site
                </label>
                <input
                  type="text"
                  value={site}
                  onChange={(e) => setSite(e.target.value)}
                  className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white
                           bg-white border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="p-4 flex justify-end space-x-2">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded border dark:border-gray-600 dark:text-gray-200 
                         border-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
              >
                {loading ? 'Adding...' : editData ? "Update" : 'Add Code'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Publishers;
