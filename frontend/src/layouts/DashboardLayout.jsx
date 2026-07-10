import { Outlet } from "react-router-dom";

import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";

const DashboardLayout = () => {

    return (

        <main className="flex h-screen bg-background">

            {/* Sidebar */}

            <Sidebar />

            {/* Main */}

            <section className="flex flex-1 flex-col overflow-hidden">

                {/* Navbar */}

                <TopNavbar />

                {/* Content */}

              <div className="flex-1 overflow-y-auto bg-background p-6">
    <div className="mx-auto w-full max-w-[1600px]">
        <Outlet />
    </div>
</div>

            </section>

        </main>

    );

};

export default DashboardLayout;