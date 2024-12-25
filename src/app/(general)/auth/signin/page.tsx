'use client'
import Auth from "@/components/Auth";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { auth, db } from "../../../../config/firebase"; // Adjust import path based on where your firebase.js file is located

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission

    // Clear previous errors
    setError(null);

    // Validate input fields
    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    setLoading(true);

    try {
      // Sign the user in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // console.log(user)

      // Check if the user's email is verified
      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        return;
      }
      // Fetch the user's data from Firestore to check 'approved' status
      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (!userDoc.exists()) {
        setError("User data not found.");
        await signOut(auth)
        return;
      }

      const userData = userDoc.data();

      // Check if the 'approved' field is false
      // console.log(userData, "hey")
      if (userData?.approved === false) {
        await signOut(auth)
        setError("Your account has not been approved by an admin.");
        return;
      }
      if (userData.role === 'admin') {
        router.push('/');
      } else {
        router.push('/dashboard');
      }

    } catch (error: any) {
      // Handle errors such as incorrect password or email
      setError(error.message || "An error occurred during sign-in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-boxdark-2">
      <div className="w-full max-w-md rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-8">
        <div>
          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            Sign In
          </h2>

          <form onSubmit={handleSignIn}>
            {/* Email */}
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Submit Button */}
            <div className="mb-5">
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>

            {/* Link to Sign Up */}
            <div className="mt-6 text-center">
              <p>
                Don’t have an account?{" "}
                <Link href="/auth/signup" className="text-primary">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth(SignIn);
