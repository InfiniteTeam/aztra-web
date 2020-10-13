export interface Greetings {
    readonly guild: number
    readonly channel: number
    readonly join_title_format: string | null
    readonly join_desc_format: string | null
    readonly leave_title_format: string | null
    readonly leave_desc_format: string | null
}