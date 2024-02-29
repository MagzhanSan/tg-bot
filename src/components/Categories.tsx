import { Category, CategoryList } from '.'
import { FC, useState } from 'react'

const Categories: FC<{
	categories: { name: string }[]
}> = ({ categories }) => {
	const [selectedCategory, setSelectedCategory] = useState<string>('')

	const handleSelectCategory = (category: string) => {
		setSelectedCategory(category)
	}

	return (
		<CategoryList>
			{categories.map((category, index) => (
				<Category
					key={index}
					onClick={() => {
						handleSelectCategory(category.name)
					}}
					active={selectedCategory === category.name}
				>
					{category.name}
				</Category>
			))}
		</CategoryList>
	)
}

export default Categories
