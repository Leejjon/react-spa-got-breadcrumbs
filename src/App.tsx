import { Link, Outlet } from "react-router";
import { Breadcrumbs } from "./components/breadcrumbs";
import { useState } from "react";

function App() {

    const [breadcrumbLabelOverrides, setBreadcrumbLabelOverrides] = useState<string[]>([]);

    return (
        <div className="grid grid-cols-12 min-h-screen grid-rows-[auto_1fr]">
            <div id="header" className="col-span-12 border-b-2 border-black">
                <h1 className="text-6xl font-bold text-center m-2">My Game of Thrones character app</h1>
            </div>
            <div id="navbar" className="p-2 border-r-2 border-black col-span-2 flex flex-col gap-2">
                <Link to="/">Home</Link>
                <Link to="/books">Books</Link>
                <Link to="/characters">Characters</Link>
            </div>
            <div id="content" className="col-span-10 p-2">
                <Breadcrumbs breadcrumbLabelOverrides={breadcrumbLabelOverrides} />
                <Outlet />
            </div>
        </div >
    );
}

export default App;