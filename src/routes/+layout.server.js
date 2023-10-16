export async function load({url}) {
    const searchParams = url.searchParams


    return {
        dir: searchParams.get('dir') ?? 'ltr',
        theme: searchParams.get('theme') ?? 'light',
        siteId: searchParams.get('siteId') ?? '3000'
    }
}