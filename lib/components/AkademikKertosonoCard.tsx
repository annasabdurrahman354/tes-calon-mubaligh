import * as React from 'react';
import { Avatar, Card, Text } from 'react-native-paper';
import {AkademikKertosono} from "@/lib/types/Kertosono";

const AkademikKertosonoCard: React.FC<{ data: AkademikKertosono }> = ({ data }) => {
    return (
        <Card mode={'outlined'}>
            <Card.Title
                title={data.guru_nama}
                subtitle={data.created_at}
                left={(props) => <Avatar.Image {...props} source={{ uri: data.guru_foto }} />}
            />
            <Card.Content>
                {data.catatan ? (
                    <Text style={{ marginBottom: 8 }}>{data.catatan}</Text>
                ) : (
                    <Text style={{ marginBottom: 8 }}>Tidak ada catatan</Text>
                )}
                <Text style={{ color: 'gray' }}>{`Durasi ${data.durasi_penilaian} menit`}</Text>
            </Card.Content>
        </Card>
    );
};

export default AkademikKertosonoCard;
