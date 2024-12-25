'use client'
import React, { useState } from "react";
import Link from "next/link";
import { auth, db } from "../../../../config/firebase"; // Import Firebase Auth and Firestore
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Auth from "@/components/Auth";

const SignUp: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);



      // Add user data to Firestore with "publisher" role
      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email,
        role: "publisher",
        approved:false,
        createdAt: new Date(),
      });

      // Inform the user to check their email for verification
      setError("A verification email has been sent. Please verify your email before logging in.");
      await signOut(auth)
      // Optionally, redirect to login page after signup
      setTimeout(() => {
        router.push("/auth/signin");
     
      }, 5000); // Redirect after 5 milliseconds to allow the user to read the message

    } catch (error: any) {
      setError(error.message || "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100  dark:bg-boxdark-2">
      <div className="w-full max-w-md rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-8">
        <div>
          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

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
                  placeholder="6+ Characters, 1 Capital letter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Submit Button */}
            <div className="mb-5">
              <input
                type="submit"
                value={loading ? "Signing Up..." : "Sign Up"}
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                disabled={loading}
              />
            </div>

            {/* Already have an account */}
            <div className="mt-6 text-center">
              <p>
                Already have an account?{" "}
                <Link href="/auth/signin" className="text-primary">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth(SignUp);
