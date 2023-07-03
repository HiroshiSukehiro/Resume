import styles from '../styles/Stack.module.css';

const Stack = () => {
    return (
        <div className={styles.stack}>
          <div className={styles.title}>My Stack</div>
          <div className={styles.stackBlocks}>
            <div className={styles.block}>
              <div className={styles.blockTitle}>Frontend:</div>
              <ul>
                <li>HTML/CSS</li>
                <li>Adaptive web design</li>
                <li>jQuery</li>
                <li>React</li>
                <li>Next.js</li>
                <li>Redux</li>
                <li>REST/GraphQL</li>
                <li>Web3js/Ethers.js</li>
                <li>SASS/SCSS</li>
              </ul>
            </div>
            <div className={styles.block}>
              <div className={styles.blockTitle}>Backend:</div>
              <ul>
                <li>Node.js</li>
                <li>Nest.js</li>
                <li>Express/Fastify</li>
                <li>Redis</li>
                <li>PostgreSQL/MySQL/MongoDB/others</li>
                <li>Sequelize/Prisma/TypeORM</li>
                <li>GraphQL/REST API</li>
              </ul>
            </div>
            <div className={styles.block}>
              <div className={styles.blockTitle}>Others:</div>
              <ul>
                <li>JavaScript/TypeScript</li>
                <li>Solidity</li>
                <li>Python(beginner)</li>
                <li>Git</li>
                <li>GitHub/GitLab</li>
                <li>Docker</li>
                <li>Figma/Photoshop</li>
                <li>English B2</li>
              </ul>
            </div>
          </div>
        </div>
    );
}

export default Stack;