'use client';
import { db } from "@/config/firebase";
import { useUser } from "@/context/UserContext";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const Insights = () => {
    const { user, userDetails } = useUser();
    const [insights, setInsights] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!user?.uid) return; // Wait for the user to load

        setLoading(true);

        const processedClicks = new Set(); // Track processed click IDs
        const publisherData = {
            publisherId: user.uid,
            publisherName: userDetails?.fullName,
            windowsClicks: 0,
            androidClicks: 0,
            macClicks: 0,
            totalClicks: 0,
            earnings: 0,
            registeredDate: userDetails?.createdAt?.toDate().toLocaleDateString() || "N/A",
        };

        const unsubscribeUser = onSnapshot(
            query(collection(db, "users"), where("uid", "==", user.uid)),
            (userSnapshot) => {
                if (!userSnapshot.empty) {
                    const userDoc = userSnapshot.docs[0];
                    const userData = userDoc.data();

                    // Populate publisher data
                    publisherData.publisherName = userData.fullName || "N/A";
                    publisherData.earnings = userData.earnings || 0;
                    publisherData.registeredDate = userData.createdAt?.toDate().toLocaleDateString() || "N/A";

                    setInsights([publisherData]);
                } else {
                    setInsights([]); // No publisher data found
                }

                setLoading(false);
            },
            (error) => {
                console.error("Error fetching publisher data:", error);
                setLoading(false);
            }
        );

        const unsubscribeClicks = onSnapshot(
            query(collection(db, "clicks"), where("pubId", "==", user.uid)),
            (clicksSnapshot) => {
                clicksSnapshot.forEach((clickDoc) => {
                    if (!processedClicks.has(clickDoc.id)) {
                        const clickData = clickDoc.data();

                        // Increment click counts based on device type
                        if (clickData.deviceType === "Windows") publisherData.windowsClicks += 1;
                        if (clickData.deviceType === "Android") publisherData.androidClicks += 1;
                        if (clickData.deviceType === "Mac") publisherData.macClicks += 1;

                        // Update total clicks
                        publisherData.totalClicks =
                            publisherData.windowsClicks + publisherData.androidClicks + publisherData.macClicks;

                        processedClicks.add(clickDoc.id); // Mark click as processed
                    }
                });

                setInsights([publisherData]); // Update insights with the latest click data
            },
            (error) => {
                console.error("Error fetching click data:", error);
            }
        );

        return () => {
            unsubscribeUser();
            unsubscribeClicks();
        };
    }, [user?.uid]);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Publisher Name</th>
                        <th scope="col" className="px-6 py-3">Windows Click Count</th>
                        <th scope="col" className="px-6 py-3">Android Click Count</th>
                        <th scope="col" className="px-6 py-3">Mac Click Count</th>
                        <th scope="col" className="px-6 py-3">Total Clicks</th>
                        <th scope="col" className="px-6 py-3">Earnings</th>
                        <th scope="col" className="px-6 py-3">Registered Date</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={7} className="text-center py-4">Loading...</td>
                        </tr>
                    ) : insights.length === 0 ? (
                        <tr>
                            <td colSpan={7} className="text-center py-4">No data available for this publisher</td>
                        </tr>
                    ) : (
                        insights.map((insight) => (
                            <tr key={insight.publisherId}>
                                <td className="px-6 py-4">{insight.publisherName}</td>
                                <td className="px-6 py-4">{insight.windowsClicks}</td>
                                <td className="px-6 py-4">{insight.androidClicks}</td>
                                <td className="px-6 py-4">{insight.macClicks}</td>
                                <td className="px-6 py-4">{insight.totalClicks}</td>
                                <td className="px-6 py-4">{insight.earnings}</td>
                                <td className="px-6 py-4">{insight.registeredDate}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Insights;
