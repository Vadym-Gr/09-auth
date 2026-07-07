import Link from 'next/link';


const tags = ['Work', 'Personal', 'Meeting', 'Shopping'];

export default function Sidebar() {
  return (
    <ul>
      <li>
        <Link href="/notes/filter/all">All notes</Link>
      </li>
      {tags.map(tag => (
        <li key={tag}>
          <Link href={`/notes/filter/${tag}`}>{tag}</Link>
        </li>
      ))}
    </ul>
  );
}
