import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">
            <strong>Test Stack</strong>
          </Link>
        </li>
        <li>
          <Link href="/learn">Learn</Link>
        </li>
        <li>
          <Link href="/architecture">Architecture</Link>
        </li>
        <li style={{ marginLeft: 'auto' }}>
          <a 
            href="https://github.com/unclegun/non-dotnet-tech-stack" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  );
}
