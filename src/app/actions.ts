'use server'

import api from '@/lib/api'
import envConf from '@/lib/env.conf'
import { NODE_ENV } from '@/types'
import { cookies } from 'next/headers'

let otpUser: { [key: string]: unknown } | null = null

export async function login(data: { [key: string]: string }) {

    try {
        if (data.email === 'test@example.com' && data.password === '12345678@ABcd') {
            cookies().set('refresh-token', 'test-token', {
                httpOnly: true,
                secure: envConf.NODE_ENV === NODE_ENV.PRODUCTION,
                maxAge: 84600 * 7,
                path: '/',
            })
            return {
                success: true, data: { id: '1234567890', email: 'test@example.com', name: 'Test User', code: 201 }
            }
        }

        return { success: false, error: { message: `Invalid credentials` } }


        // const { data: result } = await api.post('/users-service/auth/login', data)

        // otpUser = result?.data

        // const maxAge = new Date(result.data?.refreshToken?.expiresAt ?? Date.now()).getTime() - new Date().getTime()

        // cookies().set('refresh-token', result.data?.refreshToken?.token, {
        //     httpOnly: true,
        //     secure: envConf.NODE_ENV === NODE_ENV.PRODUCTION,
        //     maxAge: maxAge,
        //     path: '/',
        // })

        // // set Authorization header of api
        // api.defaults.headers.common['Authorization'] = `Bearer ${result.data?.accessToken}`

        // return result // {success: boolean, data?: any, error?: any}
    } catch (err: any) {
        return { success: false, error: { message: `${err?.response?.data?.code} ${err?.response?.data?.message}` } }
    }
}

export async function register(data: { [key: string]: string }) {

    try {
        const { data: result } = await api.post('/users-service/auth/register', data)

        otpUser = result?.data

        return result // {success: boolean, data?: any, error?: any}
    } catch (err: any) {
        return { success: false, error: `${err?.response?.data?.code} ${err?.response?.data?.message}` }
    }
}

export async function verifyOtp(data: { [key: string]: string }) {

    try {
        console.log(otpUser, 'otp user data')
        if (!otpUser || !data.code) return { success: false, error: `Invalid otp code` }

        const { data: result } = await api.post('/users-service/auth/verify-otp', { userId: otpUser?.id, email: otpUser?.email, phone: otpUser?.email, ...data })

        otpUser = null

        console.log(result, 'result')

        return result // {success: boolean, data?: any, error?: any}
    } catch (err: any) {
        return { success: false, error: `${err?.response?.data?.code} ${err?.response?.data?.message}` }
    }
}

export async function logout() {
    cookies().delete('refresh-token')
    return { success: true }
}

export async function getUser() {
    const token = cookies().get('refresh-token')
    console.log('getting user')
    if (token) {
        // Here you would typically decode the token and return user info
        return { id: '1', name: 'John Doe' }
    }
    return null
}