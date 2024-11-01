import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}) {
	// So, (await searchParams).query effectively waits for searchParams to resolve first, and then accesses query. Without the parentheses, JavaScript would attempt to access .query before resolving searchParams, resulting in an error.
	const query = (await searchParams).query;

	const posts = await client.fetch(STARTUPS_QUERY);
	// console.log("🚀 ~ posts:", JSON.stringify(posts, null, 2));

	// const posts = [
	// 	{
	// 		// _createdAt: "Yesterday",
	// 		_createdAt: new Date(),
	// 		views: 44,
	// 		author: { _id: 1, name: "Greg" },
	// 		_id: 1,
	// 		description: "This is a description",
	// 		image: "https://loremflickr.com/200/200?random=1",
	// 		category: "Robots",
	// 		title: "We Robots",
	// 	},
	// ];

	return (
		<>
			<section className="pink_container">
				<h1 className="heading">
					PITCH YOUR STARTUP, CONNECT WITH ENTREPRENEURS
				</h1>
				<p className="sub-heading !max-w-3xl">
					Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
					Competitions.
				</p>
				<SearchForm query={query} />
			</section>
			<section className="section_container">
				<p className="text-30-semibold">
					{query ? `Search results for "${query}"` : "All Startups"}
				</p>
				<ul className="mt-7 card_grid">
					{posts?.length > 0 ? (
						posts.map((post: StartupTypeCard, index: number) => (
							<StartupCard key={post?._id} post={post} />
						))
					) : (
						<p className="no-results">No startups found</p>
					)}
				</ul>
			</section>
		</>
	);
}
