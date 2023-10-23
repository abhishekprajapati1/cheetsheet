/*
  custom hook to show loading UI when page changes in react ecosystem. Alternative for the library nprogress and nprogress-react
*/


import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useLoader = () => {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = () => {
            setLoading(true)
            setProgress(0);
        }
        const handleRouteChangeComplete = () => {
            setProgress(100);
            setLoading(false)
        }

        const calculateProgress = () => {
            if (loading) {
                const timer = setInterval(() => {
                    if (progress < 90) {
                        setProgress((prevProgress) => prevProgress + 1);
                    }
                }, 100);

                return () => clearInterval(timer);
            }
        };

        router.events.on('routeChangeStart', handleRouteChange)
        calculateProgress();
        router.events.on('routeChangeComplete', handleRouteChangeComplete)
        router.events.on('routeChangeError', handleRouteChangeComplete)

        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
            router.events.off('routeChangeComplete', handleRouteChangeComplete)
            router.events.on('routeChangeError', handleRouteChangeComplete)
        }
    }, [router])


    return { loading, progress };
}

export default useLoader
