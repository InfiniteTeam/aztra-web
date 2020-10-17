export interface PartialGuild {
    readonly id: string
    readonly name: string
    readonly icon: string | null
    readonly owner: string
    readonly permissions: string
}

export interface PartialGuildExtend extends PartialGuild {
    readonly bot_joined: boolean
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

export interface Overwrite {
    readonly id: string
    readonly type: number
    readonly allow: string
    readonly deny: string
}

export enum ChannelTypes {
    GUILD_TEXT,
    DM,
    GUILD_VOICE,
    GROUP_DM,
    GUILD_CATEGORY,
    GUILD_NEWS,
    GUILD_STORE
}

export interface Channel {
    readonly id: string
    readonly type: number
    readonly guild_id?: string
    readonly position?: number
    readonly permissions_overwrites?: Overwrite[]
    readonly name?: string
    readonly topic?: string | null
    readonly nsfw?: boolean
    readonly last_message_id?: string | null
    readonly bitrate?: number
    readonly user_limit?: number
    readonly rate_limit_per_user?: number
    readonly recipients?: User[]
    readonly icon?: string | null
    readonly owner_id?: string
    readonly application_id?: string
    readonly parent_id?: string | null
    readonly last_pin_timestamp?: string | null
}