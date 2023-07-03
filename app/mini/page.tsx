import Calculator from "@/components/mini/Calculator";
import styles from '../../styles/mini/Page.module.css';

export default function Mini() {

  return (
    <>
        <div className={styles.main}>
          <Calculator />
        </div>
        {/* Змейка, Калькулятор, Тетрис, Декодер, Симуляция ткани */}
    </>
  )
}
