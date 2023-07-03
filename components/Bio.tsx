import styles from '../styles/Bio.module.css';

const Bio = () => {
    return (
        <div className={styles.bio}>
          <div className={styles.title}>About me</div>
          <div className={styles.text}>
            I have more than 3 years of programming experience. I have worked in various companies and freelance platforms. 
            I did the different work from writing the smart contract web interface to creating streaming services. 
          </div>
          <div className={styles.text}>
            Most of the time I've been writing the backend, but for the last six months I've been actively developing my skills as a fullstack developer.
          </div>
          <div className={styles.text}>
            I believe that technology is just a tool and the choice should be given not out of personal preferences, but the expediency of use.
          </div>
        </div>
    );
}

export default Bio;