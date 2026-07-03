import { ReactNode } from 'react';

/*export default function NotesLayout({
  children,
  sidebar,
  modal,
}: {
  children: ReactNode;
  sidebar?: ReactNode; 
  modal?: ReactNode;
}) {
  return (
    <div style={{ display: 'flex' }}>
      <aside>{sidebar}</aside>
      <main>{children}</main>
      {modal}
    </div>
  );
}*/

export default function NotesLayout(props: {
  children: ReactNode;
  sidebar: ReactNode; // ✅ Лише необхідний паралельний слот
}) {
  return (
    <div style={{ display: 'flex' }}>
      <aside>
        {props.sidebar}
      </aside>
      <main>
        {props.children}
      </main>
    </div>
  );
}