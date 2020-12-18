import React from 'react'

import { Divider, TopNavigation } from '@ui-kitten/components'
import BookList from './BookList'

export const HomeScreen = ({ navigation }) => {
	return (
		<>
			<TopNavigation title='Book Recommendations' alignment='center' />
			<Divider />
			<BookList />
		</>
	)
}
