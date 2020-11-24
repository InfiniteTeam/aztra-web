export interface Greetings {
    readonly guild: string
    readonly channel?: string
    readonly join_title_format?: string | null
    readonly join_desc_format?: string | null
    readonly leave_title_format?: string | null
    readonly leave_desc_format?: string | null
}