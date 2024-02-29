import { HEADER_COLOR, SECONDARY_COLOR } from '../constants'
import React, { useState } from 'react'
import styled, { css } from 'styled-components'

interface ISearch {
	value: string
	setSearchValue: (value: string) => void
	placeholder?: string
	onFocusChange?: (focused: boolean) => void
	fail?: boolean
	searchValue?: string
	disabled?: boolean
}

const InputWrapper = styled.div<{ isFocused: boolean; fail?: boolean }>`
	max-width: 100%;
	background: ${p =>
		p.isFocused
			? '#fff'
			: 'linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), rgb(255, 255, 255);'};
	display: flex;
	padding: 14.5px 20px;
	border-radius: 16px;
	column-gap: 10px;
	transition: background 0.3s ease-in-out, border 0.3s ease-in-out,
		box-shadow 0.3s ease-in-out;
	border: 1px solid transparent;
	max-height: 50px;
	$.icon-search {
		color: red !important;
	}

	${p =>
		p.isFocused &&
		css`
			border: 1px solid ${p.fail ? '#DF3B2C' : HEADER_COLOR};
			box-shadow: 0px 1px 2px 0px #00000040;
		`};
`

const IconSpan = styled.span<{ isFocused: boolean }>`
	font-size: 20px;
	transition: color 0.2s ease-in-out;
	color: ${props => (props.isFocused ? 'black' : '#00000066')};
`

const Input = styled.input`
	::placeholder {
		color: #00000066;
	}
	color: black;
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
	outline: none;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	background: transparent;
	width: 100%;
`

const Search: React.FC<ISearch> = ({
	value,
	setSearchValue,
	placeholder = 'Поиск',
	onFocusChange,
	fail,
	disabled,
}) => {
	const [isFocused, setIsFocused] = useState(false)

	const handleFocus = () => {
		setIsFocused(true)
		if (onFocusChange) {
			onFocusChange(true)
		}
	}

	const handleBlur = () => {
		setIsFocused(false)
		if (onFocusChange) {
			onFocusChange(false)
		}
	}

	const handleIconMouseDown = (e: React.MouseEvent) => {
		e.preventDefault()
	}

	return (
		<InputWrapper isFocused={isFocused} fail={fail}>
			<IconSpan isFocused={isFocused} className='icon-search'></IconSpan>
			<Input
				value={value}
				onChange={e => setSearchValue(e.target.value)}
				placeholder={placeholder}
				onFocus={handleFocus}
				onBlur={handleBlur}
				disabled={disabled}
			/>
			{value && (
				<span
					onClick={() => setSearchValue('')}
					className='icon-plus'
					onMouseDown={handleIconMouseDown}
					style={{
						fontSize: '20px',
						color: '#00000066',
						rotate: '45deg',
						cursor: 'pointer',
					}}
				></span>
			)}
		</InputWrapper>
	)
}
export default Search
