import { Chip, Text } from 'react-native-paper'

const ScreenInfo = (props: { title: string; path: string }) => (
  <>
    <Text variant="displaySmall">{props.title}</Text>

    <Text variant="bodyLarge">Buka kode halaman berikut: </Text>

    <Chip textStyle={{ fontFamily: 'JetBrainsMono_400Regular' }}>
      {props.path}
    </Chip>

    <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
      aaaaaaaaaaaaaaa
    </Text>
  </>
)

export default ScreenInfo
