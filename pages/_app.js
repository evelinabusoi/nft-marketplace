import '../styles/globals.css'
// import { ThirdwebWeb3Provider } from '@3rdweb/hooks'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { ChainId } from '@thirdweb-dev/sdk'

/* 
The chain ID 4 represents the Rinkeby network
The 'injected' connector is a web3 connection method used by Metamask
*/

const supportedChainIds = [4]
const connectors = {
  injected: {},
}

function MyApp({ Component, pageProps }) {
  return (
    // <ThirdwebWeb3Provider
    //   supportedChainIds={supportedChainIds}
    //   connectors={connectors}
    // >
    // <Component {...pageProps} />
    // </ThirdwebWeb3Provider>
    <ThirdwebProvider
      desiredChainId={ChainId.Rinkeby}
      // chainRpc={{ [ChainId.Rinkeby]: 'https://rinkeby.infura.io/v3/' }}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}
export default MyApp
