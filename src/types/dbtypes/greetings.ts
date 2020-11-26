export interface Greetings {
    guild: string
    channel?: string
    join_title_format?: string | null
    join_desc_format?: string | null
    leave_title_format?: string | null
    leave_desc_format?: string | null
}