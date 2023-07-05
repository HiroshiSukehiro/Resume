import Calculator from "@/components/mini/Calculator";
import styles from '../../styles/mini/Page.module.css';
import Decoder from "@/components/mini/Decoder";
import Tetris from "@/components/mini/Tetris";
import Snake from "@/components/mini/Snake";

export default function Mini() {

  return (
    <>
        <div className={styles.main}>
          <Calculator />
          <Decoder />
          <Tetris />
          <Snake />
        </div>
    </>
  )
}
