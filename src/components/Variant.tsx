import { Category, CategoryList } from '.'
import { FC, useState } from 'react'

const Variant: FC<{
	variants: { name: string }[]
}> = ({ variants }) => {
	const [selectedVariant, setSelectedVariant] = useState<string>('')

	const handleSelectCategory = (category: string) => {
		setSelectedVariant(category)
	}

	return (
		<CategoryList>
			{variants.map((variant, index) => (
				<Category
					key={index}
					onClick={() => {
						handleSelectCategory(variant.name)
					}}
					active={selectedVariant === variant.name}
				>
					{variant.name}
				</Category>
			))}
		</CategoryList>
	)
}

export default Variant
