import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase"; // Adjust this path based on where you store firebase.js
import ClickOutside from "@/components/ClickOutside";
import { useUser } from "@/context/UserContext";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, userDetails, isLoading } = useUser();
  // console.log(user, userDetails, isLoading)
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out using Firebase's signOut method
      
      // console.log("User logged out successfully");
      // You might want to redirect to the login page after logging out
      // window.location.href = "/auth/signin"; // Adjust as needed
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  const getInitials = (name: string): string => {
    const nameParts = name.split(" ");
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
    return initials;
  };

   // Determine avatar image source
   const avatarSrc = user?.photoURL || `/images/user/user-01.png`; 
   const avatar = user?.photoURL ? (
     <Image
       width={112}
       height={112}
       src={avatarSrc}
       alt="User"
       className="rounded-full"
     />
   ) : (
     <div className="h-12 w-12 rounded-full flex items-center justify-center bg-blue-500 text-white">
       <span className="text-lg">{getInitials(userDetails?.fullName || "")}</span>
     </div>
   );
 

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        href="#"
        onClick={toggleDropdown}
        className="flex items-center gap-4"
        aria-expanded={dropdownOpen ? "true" : "false"}
        aria-haspopup="true"
        aria-controls="user-dropdown-menu"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white capitalize">
            {user?.displayName || userDetails?.fullName}
          </span>
          <span className="block text-xs">{userDetails?.role}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          {/* <Image
            width={112}
            height={112}
            src="/images/user/user-01.png"
            alt="User"
            className="rounded-full"
          /> */}
          {avatar}
        </span>

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
          />
        </svg>
      </Link>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div
          id="user-dropdown-menu"
          className="absolute right-0 mt-4 w-62.5 flex-col rounded-sm border bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            {/* <li>
              <Link
                href="/profile"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 hover:text-primary lg:text-base"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z"
                  />
                  <path
                    d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z"
                  />
                </svg>
                My Profile
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 hover:text-primary lg:text-base"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.6687 1.44374C17.1187 0.893744 16.4312 0.618744 15.675 0.618744H7.42498C6.25623 0.618744 5.25935 1.58124 5.25935 2.78437V4.12499H4.29685C3.88435 4.12499 3.50623 4.46874 3.50623 4.91562C3.50623 5.36249 3.84998 5.70624 4.29685 5.70624H5.25935V10.2781H4.29685C3.88435 10.2781 3.50623 10.6219 3.50623 11.0687C3.50623 11.4812 3.88435 11.8599 4.29685 11.8599H5.25935V15.2062C5.25935 15.9937 5.9937 16.7587 6.78125 16.7587H7.42498C7.77598 16.7587 8.12498 16.9937 8.34848 17.2762L13.134 22.4999C13.5095 22.9687 14.4225 22.9687 14.7985 22.4999L19.248 17.2762C19.4715 16.9937 19.775 16.7587 20.124 16.7587H20.7675C21.556 16.7587 22.2903 15.9937 22.2903 15.2062V10.2781H21.3278C20.9153 10.2781 20.5373 9.93437 20.5373 9.48749V5.70624H21.3278C21.7403 5.70624 22.0903 5.36249 22.0903 4.91562C22.0903 4.46874 21.7403 4.12499 21.3278 4.12499H20.7675V2.78437C20.7675 1.58124 19.7706 0.618744 18.6018 0.618744H17.6687Z"
                  />
                </svg>
                My Contacts
              </Link>
            </li> */}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3.5 text-sm font-medium duration-300 hover:text-primary lg:text-base"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z"
                    fill=""
                  />
                  <path
                    d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z"
                    fill=""
                  />
                </svg>
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
