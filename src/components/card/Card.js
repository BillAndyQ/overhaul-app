

export default function Card({children, className,...props}){
    return(
        <div {...props} className={`border rounded m-1 px-2 py-1 bg-light ${className}`}>
            {children}
        </div>
    )
}