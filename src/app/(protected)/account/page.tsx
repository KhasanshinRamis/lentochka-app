import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import Sidebar from "@/components/Sidebar";
import ProfileCard from "@/app/(protected)/account/components/ProfileCard";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Main() {

  const user = useCurrentUser();

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