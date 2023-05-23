import "@fastify/jwt"


declare module "@fastify/jwt" {
    export interface FastifyJWT {
        user: {
            sub: srting,
            name: string, 
            avatarUrl: string,
        }
    }
}