
import { Helmet } from 'react-helmet';
import Layout_1 from '../../components/layput/layput_1';
import Banner from './banner';
import MenuDashboard from './menu';

export default function Dashboard() {
    return (
        <>
            <Helmet>
                <title>Home | SIMS PPOB</title>
                <meta name="description" content="Halaman utama SIMS PPOB" />
            </Helmet>
            <Layout_1>
                <MenuDashboard />
                <Banner />
            </Layout_1>
        </>
    )
}