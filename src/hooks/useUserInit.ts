import { useEffect } from 'react';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { checkAndCreateUser } from '@/services/UserService';

export function useUserInit() {
    const launchParams = useLaunchParams();
    const userId = launchParams.tgWebAppData?.user?.id;
    const firstName = launchParams.tgWebAppData?.user?.first_name;

    useEffect(() => {
        if (userId && firstName) {
            checkAndCreateUser(userId, firstName)
                .catch(error => console.error('Failed to initialize user:', error));
        }
    }, [userId, firstName]);
} 