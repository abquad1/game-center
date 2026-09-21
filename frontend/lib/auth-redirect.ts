export const buildAuthUrl = (page: '/login' | '/signup', redirectTo?: string )=>{
    if (!redirectTo || redirectTo === '/') return page

    return `${page}?redirect=${encodeURIComponent(redirectTo)}`
}

export const getSafeRedirect = (value: string | null)=>{
    if (!value || !value.startsWith('/') || value.startsWith('//')) return "/"
    return value
}