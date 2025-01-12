import * as React from 'react';
import { Avatar, Card, Text } from 'react-native-paper';

const AkhlakCard: React.FC<{ data }> = ({ data }) => {
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
                <Text style={{ color: 'gray' }}>Poin {data.poin}</Text>
            </Card.Content>
        </Card>
    );
};

export default AkhlakCard;

