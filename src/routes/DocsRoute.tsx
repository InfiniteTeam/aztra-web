import React from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'

import AztraCommandsGuide from '../docs/aztra-commands-guide'
import DocViewWithNav from '../pages/DocViewWithNav'
import { GuideGroupType } from '../types/GuideIndexTypes'

interface DocsRendererParams {
  pageid: string
}

interface DocsRendererProps extends RouteComponentProps<DocsRendererParams> {
  group: GuideGroupType
}

const DocsRenderer: React.FC<DocsRendererProps> = ({ group, match }) => {
  return (
    <DocViewWithNav
      pageId={match.params.pageid}
      index={group}
    />
  )
}

const DocsRoute: React.FC = () => {
  return (
    <Route>
      <Switch>
        <Route
          path="/docs/commands-guide/:pageid"
          render={props => <DocsRenderer group={AztraCommandsGuide} {...props} />}
        />
      </Switch>
    </Route>
  )
}

export default DocsRoute