import Link from "next/link"

export default function BtnRedirect({className, children, ...props}){
    return (

        <Link {...props} className={`btn btn-outline-primary btn-sm text-nowrap ${className}`}>
            {children}
        </Link>
    )
}