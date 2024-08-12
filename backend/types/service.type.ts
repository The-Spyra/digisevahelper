interface Service {
	_id: string,
	name: string,
	imageUrl: string,
	redirectUrl: string
	documents: string[],
	minPrice: number,
	maxPrice: number,
	createdAt: Date
}
