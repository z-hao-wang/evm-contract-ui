import React from 'react'
import { useWeb3React } from '@web3-react/core'
import { injected } from './connector'
import Button from "@mui/material/Button";
interface ConnectProps {
  children: React.ReactNode
}

const Connect: React.FC<ConnectProps> = ({ children }) => {
  const { active, activate, account } = useWeb3React()

  const activateWeb3 = () => {
    activate(injected, undefined, true).catch(err => {
      console.error(err)
    })
  }

  return active ?
    <>{children}</> :
    (
      <Button variant="contained" onClick={() => activateWeb3()}>
        Connect
      </Button>
    )
}

export default Connect
