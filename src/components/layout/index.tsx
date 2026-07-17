
import { ThemedLayoutV2 } from '@refinedev/antd'
//import React from 'react'
import Header from './header'
import { Children } from 'react'

const Layout = ({Children}: React.PropsWithChildren) => {
  return (
   <ThemedLayoutV2
   Header = {Header}
   Title={(titleProps) => <ThemedLayoutV2 {...titleProps} text="Refine" />}
   >
    {Children}
   </ThemedLayoutV2>
  )
}

export default Layout
