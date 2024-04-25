import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Sidebar from "@/components/Sidebar";
import ProfileCard from "@/app/(protected)/account/components/ProfileCard";

export default function Main() {
	return (
		<main>
			<Header></Header>
			<div className="flex flex-row">
				<Sidebar></Sidebar>
				<div className="flex-grow">
				<ProfileCard></ProfileCard>
				</div>
			</div>
			<Footer></Footer>
		</main>
	);
}