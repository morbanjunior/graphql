export type JwtPayload = {
    email: string;
    userId: number;
}

export type JwtPayloadrWithRefreshToken = JwtPayload & {
    refreshToken: string;
}