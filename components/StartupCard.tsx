import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
	const {
		_createdAt,
		views,
		author,
		_id,
		description,
		image,
		category,
		title,
	} = post;

	return (
		<li className="startup-card group">
			<div className="flex-between">
				<p className="startup_card_date">{formatDate(_createdAt)}</p>
				<div className="flex gap-1 5">
					<EyeIcon className="size-6 text-primary" />
					<span className="text-16-medium">{views}</span>
				</div>
			</div>
			<div className="flex-between mt-5 gap-5">
				<div className="flex-1">
					<Link href={`/users/${author?._id}`}>
						<p className="text-16-medium line-clamp-1">{author?.name}</p>
					</Link>
					<Link href={`/startup/${_id}`}>
						<h3 className="text-26-semibold line-clamp-1">{title}</h3>
					</Link>
				</div>
				<Link href={`/users/${author?._id}`}>
					<Image
						src="https://placehold.co/48x48"
						alt="plaeholder"
						width={48}
						height={48}
						className="rounded-full"
					/>
				</Link>
			</div>
			<Link href={`/startup/${_id}`}>
				<p className="startup-card_desc">{description}</p>
				<img src={image} alt="placeholder" className="startup-card_img" />
			</Link>
			<div className="flex-between gap-3 mt-5">
				<Link href={`/?query=${category?.toLowerCase()}`}>
					<p className="text-16-medium">{category}</p>
				</Link>
				{/* Tag asChild dla komponentu <Button> oznacza, że komponent ten przyjmuje inny element jako swojego "dziecka" i dziedziczy jego właściwości oraz styl. Jest to użyteczne w bibliotekach takich jak Radix UI, ponieważ pozwala nadpisać domyślny tag elementu (np. <button>) dowolnym elementem HTML (np. <a>, <div>) lub innym komponentem, zachowując przy tym funkcjonalność i styl komponentu <Button>. */}
				<Button className="startup-card_btn" asChild>
					<Link href={`/startup/${_id}`}>Details</Link>
				</Button>
			</div>
		</li>
	);
};

export default StartupCard;
