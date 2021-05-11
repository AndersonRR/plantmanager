import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { loadPlant, PlantProps } from '../libs/storage';

import { Header } from '../components/Header';

import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWaterd] = useState<string>();

    useEffect(() => {
        async function loadStorageData() {
            const plantStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            );

            setNextWaterd(
                `Não esqueça de regar a ${plantStoraged[0].name} em ${nextTime}.`
            );

            setMyPlants(plantStoraged);
            setLoading(false);
        }

        loadStorageData();
    });

    return (
        <View style={styles.container}>
            <Header/>

            <View style={styles.spotlight}>
                <Image 
                    source={waterdrop}
                    style={styles.spotlightImage}
                />
                <Text style={styles.spotlightText}>
                    {nextWaterd}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>
                
                <FlatList
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({item}) => (
                        <PlantCardSecondary data={item}/>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage: {
        width: 60,
        height: 60
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 15,
        textAlign: 'justify'
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
})