import React from "react";
import Link from "next/link";

const links = [
  { href: "/broadcast", label: "Broadcast", key: "" },
  // { href: "/watch", label: "Watch", key: '' },
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`;
  return link;
});

const Nav: React.SFC = (): JSX.Element => (
  <nav>
    <ul>
      <li>
        <Link prefetch href="/">
          <a>Home</a>
        </Link>
      </li>
      <ul>
        {links.map(({ key, href, label }) => (
          <li key={key}>
            <Link href={href}>
              <a>{label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </ul>
  </nav>
);

export default Nav;
