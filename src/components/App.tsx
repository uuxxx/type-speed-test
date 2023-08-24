import {Text} from '@components/text';
import st from '@styles/app.module.scss';
import {useTheme} from '@/hooks';

export function App() {
  useTheme();
  return (
    <div className={st.wrapper}>
      <Text />
    </div>
  );
}
