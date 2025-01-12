import * as React from 'react';
import { Avatar, Card, Text } from 'react-native-paper';
import {AkademikKediri} from "@/lib/types/Kediri";

const AkademikKediriCard: React.FC<{ data: AkademikKediri }> = ({ data }) => {
    return (
        <Card mode={'outlined'}>
            <Card.Title
                title={data.guru_nama}
                subtitle={data.created_at}
                left={(props) => <Avatar.Image {...props} source={{ uri: data.guru_foto }} />}
            />
            <Card.Content>
                <Text>Makna: {data.nilai_penjelasan}</Text>
                <Text>Keterangan: {data.nilai_penjelasan}</Text>
                <Text>Penjelasan: {data.nilai_penjelasan}</Text>
                <Text>Pemahaman: {data.nilai_pemahaman}</Text>
                {data.catatan ? (
                    <Text>{data.catatan}</Text>
                ) : (
                    <Text>Tidak ada catatan</Text>
                )}
            </Card.Content>
        </Card>
    );
};

export default AkademikKediriCard;

