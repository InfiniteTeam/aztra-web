export interface PartialGuild {
    readonly id: string
    readonly name: string
    readonly icon: string | null
    readonly owner: string
    readonly permissions: string
}

export interface User {
    readonly id: string
    readonly username: string
    readonly descriminator: string
    readonly avatar: string | null
    readonly bot?: boolean
    readonly system?: boolean
    readonly mfa_enabled?: boolean
    readonly locale?: string
    readonly verified?: boolean
    readonly email?: string | null
    readonly flags?: number
    readonly premium_type?: number
    readonly public_flags?: number
}