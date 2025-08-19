import React, { useEffect } from 'react'
import { useUserStore } from '../stores/useUserStore'
import { useRouter } from 'next/navigation';

const ProtectPage = ({children}: {children: React.ReactNode}) => {
    
    const { user, checkAuth, checkingAuth } = useUserStore();
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        if(!checkingAuth && !user){
            router.push('/login');
        }
    }, [checkingAuth, user, router]);

    if(checkingAuth){
        return <p>Loading...</p>
    }

    return <>{children}</>
}

export default ProtectPage