import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Sidebar from "@/components/Sidebar";
import ProfileCard from "@/components/ProfileCard";

export default function Main() {
  return (
    <main>
        <Header></Header>
        <div className="flex">
						<Sidebar></Sidebar>
						<ProfileCard></ProfileCard>
				</div>
        <Footer></Footer>
    </main>
  );
}