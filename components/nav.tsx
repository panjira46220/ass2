import Link from "next/link";
export default function Nav() {
    return(
        <div>
      <nav>
      <ul>
      <li>
        <Link href="/market-diff">
          <a>Market Diff</a>
        </Link>
      </li>
      <li>
        <Link href="/chart">
          <a>Chart</a>
        </Link>
      </li>
      <li>
        <Link href="/trade">
          <a>Trade</a>
        </Link>
      </li>
    </ul>
      </nav>
      </div>
    )
}