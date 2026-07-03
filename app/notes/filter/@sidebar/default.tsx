import Link from 'next/link';

const tags = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function Sidebar() {
  return (
    <ul>
      {tags.map(tag => (
        <li key={tag}>
          <Link
            href={`/notes/filter/${tag === 'All' ? 'all' : tag}`}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
