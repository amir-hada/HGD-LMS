"use client";

import Link from "next/link";

const Links = ({ href, children, target, ...props }) => {
  const isExternal =
    href && (href.startsWith("http") || href.startsWith("https"));

  if (isExternal) {
    return (
      <a
        href={href}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
        {...props}
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "block",
          width: "100%"
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      {...props}
      target={target}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
        width: "100%"
      }}
    >
      {children}
    </Link>
  );
};

export default Links;
