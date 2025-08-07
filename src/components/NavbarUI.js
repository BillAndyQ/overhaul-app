
export default function NavbarUI({title, children}) {
  return (
    <nav className="px-3 d-flex mt-2">
        <legend>{title}</legend>
        <div className="d-flex gap-2 align-items-center">
          {children}
        </div>
    </nav>
  );
}