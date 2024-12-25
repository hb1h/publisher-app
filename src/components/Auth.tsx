import { ReactElement, useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Loader from '@/components/common/Loader';
import { useUser }  from '@/context/UserContext'; // Ensure the path to UserContext is correct
import { URLs } from '@/constants/URLs'; // Ensure URLs are correctly imported


interface Props {}

const Auth = (Component: React.ComponentType<Props>): React.ComponentType<Props> => {
    return function AuthenticatedComponent(props: Props): ReactElement | null {
        const { user, userDetails, isLoading } = useUser();
        const router = useRouter();
        const pathname = usePathname();

        // console.log(user , userDetails, isLoading,"helllo")


        useEffect(() => {
            if (isLoading) return; // Wait until loading is complete

            if (!user) {
                if (!URLs.includes(pathname)) {
                    router.push('/auth/signin');
                }
            } 
            else if (!user.emailVerified ){
                if (!URLs.includes(pathname)) {
                    router.push('/auth/signin');
                }
            }
            else if (!userDetails?.approved){
                if (!URLs.includes(pathname)) {
                    router.push('/auth/signin');
                }
            } else {
                // If the user is authenticated, prevent access to sign-in or other restricted URLs by redirecting to home
                if (URLs.includes(pathname)) {
                    if(userDetails.role === 'admin'){
                        router.push('/');
                    }else{
                        router.push('/dashboard');
                    }
                }

            }
        }, [user, isLoading, router, pathname]);

        if (isLoading) return <Loader />; // Show loading indicator while checking auth state

        if (!user && !URLs.includes(pathname)) {
            return null; // Prevent rendering while redirecting
        }

        return <Component {...props} />; // Render the protected component if authenticated
    };
};

export default Auth;
