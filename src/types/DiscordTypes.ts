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

export interface Role {
    readonly id: string
    readonly name: string
    readonly color: number
    readonly hoist: boolean
    readonly position: number
    readonly permissions: string
    readonly managed: boolean
    readonly mentionable: boolean
}

export interface Member {
    readonly user?: User
    readonly nick: string | null
    readonly roles: string[]
    readonly joined_at: string
    readonly premium_since?: string
    readonly deaf: boolean
    readonly mute: boolean
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



export interface EmojiExtended {
    readonly animated: boolean
    readonly createdAt: number | null
    readonly id: string | null
    readonly identifier: string
    readonly name: string
    readonly url: string | null
}

export interface ActivityExtended {
    readonly createdAt: number
    readonly details: string | null
    readonly emoji: EmojiExtended | null
    readonly name: string
    readonly state: string | null
    readonly timestamps: {
        readonly start: number | null
        readonly end: number | null
    } | null
    readonly type: string
    readonly url: string | null
}

export interface PresenceExtended {
    readonly activities: ActivityExtended[]
    readonly clientStatus: {
        readonly web: string | null
        readonly mobile: string | null
        readonly desktop: string | null
    }
    readonly status: string
}

export interface UserExtended {
    readonly avatar: string | null
    readonly bot: boolean
    readonly createdAt: number
    readonly defaultAvatarURL: string
    readonly discriminator: string | null
    readonly id: string
    readonly lastMessageID: string | null
    readonly locale: string | null
    readonly presence: PresenceExtended
    readonly system: boolean | null
    readonly tag: string | null
    readonly username: string | null
}

export interface MemberExtended {
    readonly bannable: boolean
    readonly displayColor: number
    readonly displayName: string | null
    readonly joinedAt: number | null
    readonly kickable: boolean
    readonly lastMessageChannelId: string | null
    readonly lastMessageId: string | null
    readonly manageable: boolean
    readonly nickname: string | null
    readonly permissions: number
    readonly premiumSince: number | null

    readonly highestRole: string
    readonly hoistRole: string
    readonly roles: string[]

    readonly user: UserExtended
}