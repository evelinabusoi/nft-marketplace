import { useEffect, useState } from 'react'

import { HiTag } from 'react-icons/hi'
import { IoMdWallet } from 'react-icons/io'
import toast, { Toaster } from 'react-hot-toast'
import { MarketplaceModule, ThirdwebSDK } from '@3rdweb/sdk'
// import { useWeb3 } from '@3rdweb/hooks'
// import { useAuctionWinner } from '@thirdweb-dev/react'
import { ethers } from 'ethers'

const style = {
  button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
  buttonIcon: `text-xl`,
  buttonText: `ml-2 text-lg font-semibold`,
}

const MakeOffer = ({ isListed, selectedNft, listings, marketPlaceModule }) => {
  const [selectedMarketNft, setSelectedMarketNft] = useState()
  const [enableButton, setEnableButton] = useState(false)

  useEffect(() => {
    if (!listings || isListed === 'false') return
    ;(async () => {
      console.log('listings: ', listings[0])
      setSelectedMarketNft(
        listings.find((marketNft) => {
          console.log(
            'marketNft?.asset?.id === selectedNft.id: ',
            marketNft.asset?.id === selectedNft.id
          )
          console.log('marketNft?.id', marketNft.asset?.id)
          console.log('selectedNft.id', selectedNft.id)
          return marketNft.asset?.id.toString() === selectedNft.id.toString()
        })
      )
    })()
  }, [selectedNft, listings, isListed])

  useEffect(() => {
    if (!selectedMarketNft || !selectedNft) return

    setEnableButton(true)
  }, [selectedMarketNft, selectedNft])

  const confirmPurchase = (toastHandler = toast) =>
    toastHandler.success(`Purchase successful!`, {
      style: {
        background: '#04111d',
        color: '#fff',
      },
    })

  const buyItem = async (
    listingId = selectedMarketNft.id,
    quantityDesired = 1,
    module = marketPlaceModule
  ) => {
    console.log('HERE')
    try {
      // console.log('sdk: ', sdk)
      // console.log('MarketplaceModule: ', marketPlaceModule)
      // console.log('Listing id: ', listingId)
      // console.log('SelectedMarketNFT: ', selectedMarketNft)
      console.log('marketPlaceModule', marketPlaceModule)
      marketPlaceModule.direct.buyoutListing(listingId, quantityDesired)
      // marketPlaceModule.gasCostOf
      // await module.contract.buy()
      // const overrides = { gasLimit: 210000 }
      // const tx = await module.contract.buy(
      //   listingId,
      //   quantityDesired,
      //   '0x2D81cAdc1eefDEAb59ddFc2e81D8ce8B17D3878a',
      //   ethers.utils.parseEther('0.1'),
      //   overrides
      // )
      // const result = await tx.wait()
      // console.log('Result: ', result)
      confirmPurchase()
      // await module.buyoutListing(listingId, quantityDesired)
    } catch (error) {
      console.log('Error on buyItem: ', error)
    }
    // .catch((error) => console.error(error))
  }

  return (
    <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12">
      <Toaster position="top-center" reverseOrder={false} />
      {isListed === 'true' ? (
        <>
          <div
            onClick={() => {
              enableButton ? buyItem(selectedMarketNft.id, 1) : null
            }}
            className={`${style.button} bg-[#2081e2] hover:bg-[#0c0e0f]`}
          >
            <IoMdWallet className={style.buttonIcon} />
            <div className={style.buttonText}>Buy Now</div>
          </div>
          <div
            className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
          >
            <HiTag className={style.buttonIcon} />
            <div className={style.buttonText}>Make Offer</div>
          </div>
        </>
      ) : (
        <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
          <IoMdWallet className={style.buttonIcon} />
          <div className={style.buttonText}>List Item</div>
        </div>
      )}
    </div>
  )
}

export default MakeOffer
