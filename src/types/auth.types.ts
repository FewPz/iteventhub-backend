export interface UserPayload {
    id: string;
    email: string;
    name: string | null;
    avatar: string | null;
}

export interface JwtPayload {
    id: string;
    iat: number;
    exp: number;
}

// Add to express Request type
declare global {
    namespace Express {
        interface User extends UserPayload { }
    }
}

export {};