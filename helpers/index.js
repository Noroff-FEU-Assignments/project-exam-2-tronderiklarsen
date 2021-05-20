import cookie from "cookie"

export function parseCookies(request) {
    return cookie.parse(request ? request.headers.cookie || "" : document.cookie)
}