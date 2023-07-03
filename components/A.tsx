import Link from "next/link";
import styles from '../styles/A.module.css';

type Props = {
    text: string,
    href: string
}

const A: React.FC<Props> = ({text, href}) => {
    return (
        <Link className={styles.link} href={href}>
            <span className={styles.text}>{text}</span>
        </Link>
    )
}

export default A;