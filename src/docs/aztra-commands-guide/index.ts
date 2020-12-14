import { GuideGroupType } from '../../types/GuideIndexTypes'

import Icon from './icon.png'
import GettingStarted from './getting-started.md'
import BasicCommands from './basic-commands.md'

export { GettingStarted }
export { BasicCommands }

const index: GuideGroupType = {
  id: "commands-guide",
  name: "Aztra 명령어 가이드",
  homePageName: "getting-started",
  icon: Icon,
  pages: [
    {
      id: "getting-started",
      title: "시작하기",
      content: GettingStarted
    },
    {
      id: "basic-commands",
      title: "기본 명령어",
      content: BasicCommands
    }
  ]
}

export default index