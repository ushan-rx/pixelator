import dynamic from "next/dynamic";

const HeroPixelArt = dynamic(() => import("@/app/components/HeroPixelArt"));

export default function Home() {
	return (
		<div className='font-sans '>
			<main className=''>
				<header className='max-h-[150px]'>
					<HeroPixelArt />
				</header>
			</main>
		</div>
	);
}
