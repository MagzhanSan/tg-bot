import { fallbackImage } from '../constants'
import { BannerImage, StyledBanner } from '../style/index'
import { FC } from 'react'

const Banner: FC<{ imageSrc?: string }> = ({ imageSrc }) => {
	return (
		<StyledBanner>
			<BannerImage alt='banner' src={imageSrc ? imageSrc : fallbackImage} />
		</StyledBanner>
	)
}

export default Banner
