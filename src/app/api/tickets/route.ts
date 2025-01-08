export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);

	const untypedSearchParams = Object.fromEntries(searchParams);
	const typedSearchParams = searchParams.get('name');
}
