import Link from "next/link";

export default function ButtonLink({ href, children, variant, ...props }) {
    if(href) {
        return (
            <Link href={href} className={`btn ${variant || "main"}`} {...props}>
              {children}
            </Link>
          );
    }
    return <button className={`btn ${variant || "main"}`} {...props}>{children}</button>
  }   