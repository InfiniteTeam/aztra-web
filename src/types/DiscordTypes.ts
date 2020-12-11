import { ClientPresenceStatus } from "discord.js";

export interface PartialGuild {
    id: string
    name: string
    icon: string | null
    owner: string
    permissions: string
}

export interface PartialGuildExtend extends PartialGuild {
    bot_joined: boolean
}

export interface User {
    id: string
    username: string
    descriminator: string
    avatar: string | null
    bot?: boolean
    system?: boolean
    mfa_enabled?: boolean
    locale?: string
    verified?: boolean
    email?: string | null
    flags?: number
    premium_type?: number
    public_flags?: number
}

export interface Role {
    id: string
    name: string
    color: number
    hoist: boolean
    position: number
    permissions: string
    managed: boolean
    mentionable: boolean
}

export interface Member {
    user?: User
    nick: string | null
    roles: string[]
    joined_at: string
    premium_since?: string
    deaf: boolean
    mute: boolean
}

export interface Overwrite {
    id: string
    type: number
    allow: string
    deny: string
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
    id: string
    type: number
    guild_id?: string
    position?: number
    permissions_overwrites?: Overwrite[]
    name?: string
    topic?: string | null
    nsfw?: boolean
    last_message_id?: string | null
    bitrate?: number
    user_limit?: number
    rate_limit_per_user?: number
    recipients?: User[]
    icon?: string | null
    owner_id?: string
    application_id?: string
    parent_id?: string | null
    last_pin_timestamp?: string | null
}



export interface EmojiExtended {
    animated: boolean
    createdAt: number | null
    id: string | null
    identifier: string
    name: string
    url: string | null
}

export type EmojiExtendedFulltimed = Omit<EmojiExtended, 'createdAt'> & {
    createdAt: Date | null
}

export interface ActivityExtended {
    createdAt: number
    details: string | null
    emoji: EmojiExtended | null
    name: string
    state: string | null
    timestamps: {
        start: number | null
        end: number | null
    } | null
    type: string
    url: string | null
}

export type ActivityExtendedFulltimed = Omit<ActivityExtended, 'createdAt' | 'timestamps' | 'emoji'> & {
    createdAt: Date
    emoji: EmojiExtendedFulltimed | null
    timestamps: {
        start: Date | null
        end: Date | null
    } | null
}

export interface PresenceExtended {
    activities: ActivityExtended[]
    clientStatus: {
        web: ClientPresenceStatus | null
        mobile: ClientPresenceStatus | null
        desktop: ClientPresenceStatus | null
    } | null
    status: string
}

export type PresenceExtendedFulltimed = Omit<PresenceExtended, 'activities'> & {
    activities: ActivityExtendedFulltimed[]
}

export interface UserMinimal {
    avatar: string | null
    bot: boolean
    createdAt: number
    defaultAvatarURL: string
    discriminator: string | null
    id: string

    system: boolean | null
    tag: string | null
    username: string | null
    locale: string | null
}

export interface UserExtended extends UserMinimal {
    lastMessageID: string | null
    presence: PresenceExtended
}

export type UserExtendedFulltimed = Omit<UserExtended, 'createdAt' | 'presence'> & {
    createdAt: Date
    presence: PresenceExtendedFulltimed
}

export interface MemberMinimal {
    displayColor: number
    displayName: string | null
    joinedAt: number | null
    nickname: string | null
    permissions: number
    premiumSince: number | null
    roles: string[]

    user: UserMinimal
}

export interface MemberExtended extends MemberMinimal {
    bannable: boolean

    kickable: boolean
    lastMessageChannelId: string | null
    lastMessageId: string | null
    manageable: boolean

    highestRole: string
    hoistRole: string | null

    user: UserExtended
}

export type MemberExtendedFulltimed = Omit<MemberExtended, 'joinedAt' | 'premiumSince' | 'user'> & {
    joinedAt: Date | null
    premiumSince: Date | null
    user: UserExtendedFulltimed
}

export interface ChannelMinimal {
    createdTimestamp: number
    id: string
    manageable: boolean
    name: string
    parentID: string | null
    position: number
    rawPosition: number
    type: string
    viewable: boolean
}