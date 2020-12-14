export interface GuidePageType {
    id: string
    title: string
    content: string
}

export interface GuideGroupType {
    name: string
    id: string
    pages: GuidePageType[]
    homePageName: string
    icon: string
}