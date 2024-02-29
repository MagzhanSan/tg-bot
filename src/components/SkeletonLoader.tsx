import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`

const Skeleton = styled.div<{
	width: string
	height: string
	baseColor?: string
	shineColor?: string
	borderRadius?: string
	noneAnimation?: boolean
}>`
	width: ${props => props.width};
	height: ${props => props.height};
	border-radius: ${props => props.borderRadius};
	background: ${props => {
		const baseColor = props.baseColor ?? '#0000001A'
		const shineColor = props.noneAnimation
			? '#0000001A'
			: props.shineColor ?? '#e8e8e8'
		return `linear-gradient(to right, ${baseColor} 0px, ${shineColor} 40px, ${baseColor} 80px)`
	}};

	transition: width 0.5s ease;
	background-size: 800px 104px;
	animation: ${p => !p.noneAnimation && shimmer} 1.4s linear infinite;
`

interface ISkeletonLoader {
	width: string
	height: string
	baseColor?: string
	shineColor?: string
	borderRadius?: string
	noneAnimation?: boolean
}

const SkeletonLoader: React.FC<ISkeletonLoader> = ({
	width,
	height,
	baseColor,
	shineColor,
	borderRadius = '8px',
	noneAnimation,
}) => {
	const [currentWidth, setCurrentWidth] = useState(width)

	useEffect(() => {
		setCurrentWidth(width)
	}, [width])

	return (
		<>
			<Skeleton
				width={currentWidth}
				height={height}
				baseColor={baseColor}
				shineColor={shineColor}
				borderRadius={borderRadius}
				noneAnimation={noneAnimation}
			/>
		</>
	)
}

export default SkeletonLoader
