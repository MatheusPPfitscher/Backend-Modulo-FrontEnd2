export function extractTokenFromHeader(authHeader: string): string {
    return authHeader.split(" ")[1];
}