export type List = {
	id: string
	items: []
	lastEdited: Date
	description?: string
}

export type ListItem = {
	itemId: string
	quantity: number
}

export type Item = {
	id: string
	title: string
}
