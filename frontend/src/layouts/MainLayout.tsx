import { Outlet } from 'react-router';
import NavBar from '../components/NavBar';

function MainLayout() {
    return (
        <div className="">
            <NavBar />
            <main className="flex-1 p-4 bg-black/94 text-white mt-10">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;