import css from './ErrorMessage.module.css';

interface Props {
  message?: string;
}

export default function ErrorMessage({
  message = 'Something went wrong...',
}: Props) {
  return <p className={css.error}>{message}</p>;
}