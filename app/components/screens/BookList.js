import React, { useState, useEffect, memo } from 'react'

import { Dimensions, ImageBackground } from 'react-native'
import {
	Card,
	List,
	Text,
	Spinner,
	Layout,
	StyleService,
	useStyleSheet
} from '@ui-kitten/components'

const BookList = () => {
	const styles = useStyleSheet(themedStyles)

	const [loading, setLoading] = useState(true)
	const [books, setBooks] = useState(true)

	const renderItemHeader = (item) => (
		<ImageBackground
			style={styles.cardHeader}
			source={{ uri: item.image }}
		></ImageBackground>
	)

	const renderItem = ({ item }) => {
		return (
			<Card
				style={styles.item}
				header={() => renderItemHeader(item)}
				onPress={() => loadBooks(item.bookId)}
			>
				<Text style={{ fontWeight: 'bold' }} category='p1' numberOfLines={2}>
					{item.title}
				</Text>
				<Text appearance='hint' category='s2'>
					{item.author}
				</Text>
			</Card>
		)
	}

	const loadBooks = async (id) => {
		setLoading(true)
		const myHeaders = new Headers()

		myHeaders.append('Content-Type', 'application/json')

		const raw = JSON.stringify({ bookId: id })

		const requestOptions = {
			method: 'POST',
			body: raw,
			headers: myHeaders,
			redirect: 'follow'
		}

		const result = await fetch('http://localhost:5000/books', requestOptions)

		const resultJson = await result.json()
		setBooks(resultJson.results)
		setLoading(false)
	}

	useEffect(() => {
		loadBooks(100)
	}, [])

	return loading ? (
		<Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Spinner size='large' />
		</Layout>
	) : (
		<List
			style={styles.wrapper}
			numColumns={2}
			contentContainerStyle={styles.container}
			data={books}
			renderItem={renderItem}
			onEndReachedThreshold={1}
		/>
	)
}

export default memo(BookList)

const themedStyles = StyleService.create({
	wrapper: {
		flex: 1,
		backgroundColor: 'background-basic-color-3'
	},
	container: {
		paddingHorizontal: 2,
		paddingVertical: 8
	},
	item: {
		flex: 1,
		margin: 1,
		borderRadius: 1,
		maxWidth: Dimensions.get('window').width / 2 - 3
	},
	cardHeader: {
		height: 300,
		position: 'relative'
	},
	price: {
		textDecorationLine: 'line-through',
		marginLeft: 10
	},
	percentage: {
		color: 'color-danger-600',
		marginLeft: 10
	},
	wishList: {
		position: 'absolute',
		top: 0,
		right: 0,
		height: 30,
		width: 30,
		borderRadius: 50
	},
	cardFooter: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingVertical: 8,
		paddingHorizontal: 20
	},
	spinnerWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	loaderContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 20
	},
	nothing: {
		height: Dimensions.get('window').height - 150,
		justifyContent: 'center',
		alignItems: 'center'
	}
})
