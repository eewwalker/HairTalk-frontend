"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthContextType, User } from "@/types";
import { getUser, logInUser } from "@/src/lib/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode; }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const login = async (username:string, password:string) => {
        try{
            setLoading(true);
            const token = await logInUser(username, password);
            const userResp = await getUser(token.userId);
            if (userResp) {
                setUser(userResp);
                router.push('/');
            }
        }catch(error) {
            console.error('Error logging in:', error);
        }finally {
            setLoading(false);
        }
    };

    const logout = async()=> {
        try {
            setLoading(true);
            await fetch('api/logout', {
                method: 'POST',
                credentials: 'include',
            });
            setUser(null);
            router.push('/');
        }catch(error) {
            console.log('Error logging out:', error);
        }finally{
            setLoading(false);
        }
    };

    return (
        < AuthContext.Provider value={{user, login, logout, loading}}>
        {children}
        </AuthContext.Provider>

    );
};


export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}


