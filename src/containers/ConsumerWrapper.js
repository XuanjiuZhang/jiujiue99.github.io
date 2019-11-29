import React from "react"
import { observer } from "mobx-react-lite"
import { RouterContext } from '@src/Router'

const ConsumerWrapper = (InnerComponent) => observer(() => {
  return <RouterContext.Consumer>
    {
      (globalStore) => {
        return <InnerComponent globalStore={globalStore} />
      }
    }
  </RouterContext.Consumer>
})

export default ConsumerWrapper
