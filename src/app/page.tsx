import { Header } from '@/components/layout/header';
import StartpageContent from './start/components/StartpageContent';
import { Footer } from '@/components/layout/footer';

export default function Home() {

	return (
		<main>
			<Header/>
			<StartpageContent/>
			<Footer/>
		</main>
	);
}