export function getClientIP(request: Request) {
    const headers = request.headers;
    return headers.get('x-forwarded-for')?.split(',')[0].trim() || headers.get('cf-connecting-ip') || headers.get('x-real-ip') || '0.0.0.0';
}
