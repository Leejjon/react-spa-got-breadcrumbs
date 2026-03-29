import { Fragment } from "react";
import { Link, useLocation } from "react-router";

export function Breadcrumbs() {
    const pathname = useLocation().pathname;
    console.log(pathname);
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    return (
        <div className="mb-2">
            <Link to="/" key="breadcrumb0">Home</Link>{pathname === '/' ? '' : ' -> '}
            {pathSegments.map((segment, index) => {
                const renderBreadcrumbSeparation = index > 0 && ' -> ';
                const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
                return (
                    <Fragment key={`breadcrumb${index + 1}`}>
                        {renderBreadcrumbSeparation}
                        <Link to={url}>
                            <span className="capitalize">{segment}</span>
                        </Link>
                    </Fragment>
                );
            })}
        </div>
    );
}
