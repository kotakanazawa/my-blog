import styles from "./layout.module.css"
import utilStyles from "../styles/utils.module.css"
import Link from "next/link"

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={utilStyles.headingXl}>Kota Kanazawa's blog</h1>
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            ← Back to home
          </Link>
        </div>
      )}
    </div>
  );
}
