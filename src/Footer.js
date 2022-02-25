import styles from './Styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={`container d-flex flex-wrap align-items-center lh-lg py-4 ${styles.footer}`}>
      <a href='/'>Home</a>
      <a className='mx-3' href='https://github.com/5j54d93/Dcard-2022-Web-Frontend-Intern-Homework' target='_blank' rel='noreferrer'> GitHub</a>
      <a className='me-auto' href='https://linktr.ee/5j_54d93' target='_blank' rel='noreferrer'> Linktree</a>
      Copyright © Ricky Chuang 2022
    </footer>
  );
}
