import Header from '../../components/Header'
import { useEffect, useMemo, useState } from 'react'
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { useRouter } from 'next/router'
import NFTImage from '../../components/nft/NFTImage'
import GeneralDetails from '../../components/nft/GeneralDetails'
import ItemActivity from '../../components/nft/ItemActivity'
import Purchase from '../../components/nft/Purchase'
import { useMarketplace, useNFTCollection } from '@thirdweb-dev/react'
import { ethers } from 'ethers'

const style = {
  wrapper: `flex flex-col items-center container-lg text-[#e5e8eb]`,
  container: `container p-6`,
  topContent: `flex`,
  nftImgContainer: `flex-1 mr-4`,
  detailsContainer: `flex-[2] ml-4`,
}

const Nft = () => {
  // const { provider } = useWeb3()
  const [selectedNft, setSelectedNft] = useState()
  const [listings, setListings] = useState([])
  const router = useRouter()
  const nftModule = useNFTCollection(
    '0x45a57eC79b7fa36475527390c93ad7b5f812B2b4'
  )
  const marketPlaceModule = useMarketplace(
    '0x3a6f94861d88733caAdb1aA0515b73530ff57871'
  )

  // const nftModule = useMemo(() => {
  //   if (!provider) return

  //   const sdk = new ThirdwebSDK(provider.getSigner())
  //   return sdk.getNFTModule('0x45a57eC79b7fa36475527390c93ad7b5f812B2b4')
  // }, [provider])

  // get all NFTs in the collection
  useEffect(() => {
    if (!nftModule) return
    ;(async () => {
      const nfts = await nftModule.getAll()

      const selectedNftItem = nfts.find((nft) => {
        console.log(
          'ethers.utils.formatEther(nft.metadata.id): ',
          ethers.utils.parseEther(nft.metadata.id.toString())
        )
        console.log('router.query.id: ', router.query.id)
        return nft.metadata.id.toString() === router.query.nftId
      })

      setSelectedNft(selectedNftItem)
    })()
  }, [nftModule])

  // const marketPlaceModule = useMemo(() => {
  //   if (!provider) return

  //   const sdk = new ThirdwebSDK(provider.getSigner())
  //   return sdk.getMarketplaceModule(
  //     '0x3a6f94861d88733caAdb1aA0515b73530ff57871'
  //   )
  // }, [provider])

  useEffect(() => {
    if (!marketPlaceModule) return
    ;(async () => {
      setListings(await marketPlaceModule.getAllListings())
    })()
  }, [marketPlaceModule])

  console.log('selectedNft: ', selectedNft)

  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.topContent}>
            <div className={style.nftImgContainer}>
              <NFTImage selectedNft={selectedNft?.metadata} />
            </div>
            <div className={style.detailsContainer}>
              <GeneralDetails selectedNft={selectedNft?.metadata} />
              <Purchase
                isListed={router.query.isListed}
                selectedNft={selectedNft?.metadata}
                listings={listings}
                marketPlaceModule={marketPlaceModule}
              />
            </div>
          </div>
          <ItemActivity />
        </div>
      </div>
    </div>
  )
}

export default Nft
