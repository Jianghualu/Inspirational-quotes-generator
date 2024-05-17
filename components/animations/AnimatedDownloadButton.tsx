import React from 'react'
import Image from 'next/image'

import lottiePandaJson from '../../assets/animated-photo-panda.json'
import lottieTreeJson from '../../assets/animated-photo-tree.json'

import { CenteredLottie, DownloadQuoteCardCon, DownloadQuoteCardConText} from './AnimationElements';

interface AnimatedDownloadButtonProps {
  handleDownload: () => void;
}

const AnimatedDownloadButton = ({handleDownload}: AnimatedDownloadButtonProps) => {
// const AnimatedDownloadButton = () => {
  return (
    <DownloadQuoteCardCon 
        onClick={handleDownload}
    >
        <CenteredLottie
            loop
            // animationData={lottiePandaJson}
            animationData={lottieTreeJson}
            play
        />
        <DownloadQuoteCardConText>
            Download your quote card
        </DownloadQuoteCardConText>
    </DownloadQuoteCardCon>
  )
}

export default AnimatedDownloadButton