import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SectionList } from 'react-native';
import { useRouter } from 'expo-router';
import { COLORS, FONTS } from '../../styles/globalStyles';
import CustomFilter from './_components/CustomFilter'; 
import { mockReports } from './data/mockData';

const Separator = () => <View style={{ height: 5 }} />;

const Body = () => {
    const router = useRouter();

    const reportsToShow = mockReports.filter(r => r.type !== 'diario');

    const handlePress = (report) => {
        if (report.type === 'mensual') {
            const reportDate = new Date(report.date);
            const group = `${reportDate.getFullYear()}-${String(reportDate.getMonth() + 1).padStart(2, '0')}`;
            router.push(`/reportes/list/${group}`);
        } else {
            router.push(`/reportes/${report.id}?name=${encodeURIComponent(report.name)}`);
        }
    };

    const groupedData = reportsToShow.reduce((acc, report) => {
        const reportDate = new Date(report.date);
        let groupTitle = reportDate.getFullYear().toString();

        const existingGroup = acc.find(group => group.title === groupTitle);
        if (existingGroup) {
            existingGroup.data.push(report);
        } else {
            acc.push({ title: groupTitle, data: [report] });
        }
        return acc;
    }, []);

    const renderItem = ({ item, index }) => {
        // Calcular cuántos reportes diarios hay en este mes (si es mensual)
        let dailyCount = 0;
        if (item.type === 'mensual') {
            const reportDate = new Date(item.date);
            const year = reportDate.getFullYear();
            const month = reportDate.getMonth();
            
            dailyCount = mockReports.filter(r => {
                if (r.type !== 'diario') return false;
                const d = new Date(r.date);
                return d.getFullYear() === year && d.getMonth() === month;
            }).length;
        }

        return (
            <TouchableOpacity
                onPress={() => handlePress(item)}
                style={[styles.button, index % 2 === 0 ? styles.buttonAlt : {}]}
            >
                <View style={styles.buttonLeft}>
                    <Text style={styles.buttonText}>{item.name}</Text>
                    {item.type === 'mensual' && (
                        <Text style={styles.reportCount}>{dailyCount} reportes</Text>
                    )}
                </View>
                <Text style={styles.arrowIcon}>›</Text>
            </TouchableOpacity>
        );
    };

    const renderSectionHeader = ({ section: { title } }) => (
        <Text style={styles.headerText}>{title}</Text>
    );

    return (
        <View style={styles.fullWidthContainer}>
            {/* Contador de reportes */}
            <Text style={styles.countText}>{reportsToShow.length} Reportes</Text>

            <CustomFilter
                options1={[
                    { label: 'Anual', value: 'anual' },
                    { label: 'Mensual', value: 'mensual' },
                    { label: 'Diario', value: 'diario' },
                ]}
                onSelect1={() => {}} 
                defaultText1="Tipo de Reporte"
                options2={[
                    { label: 'Más reciente', value: 'desc' },
                    { label: 'Más antiguo', value: 'asc' },
                ]}
                onSelect2={() => {}} 
                defaultText2="Orden por"
            />

            {/* Lista de reportes sin los diarios */}
            <SectionList
                sections={groupedData}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                style={styles.container}
                ItemSeparatorComponent={Separator}
                ListEmptyComponent={<Text style={styles.emptyText}>No hay reportes disponibles.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    fullWidthContainer: {
        width: '100%',
        flex: 1,
    },
    countText: {
        fontFamily: FONTS.regular,
        fontSize: FONTS.size.sm,
        color: COLORS.blackText,
        marginBottom: 10,
        opacity: 0.7,
    },
    container: {
        width: '100%',
        marginTop: 10,
    },
    headerText: {
        fontFamily: FONTS.bold,
        fontSize: FONTS.size.lg,
        color: COLORS.blackText,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 20,
        textTransform: 'capitalize',
    },
    button: {
        backgroundColor: '#C6C7C7',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
    },
    buttonAlt: {
        backgroundColor: '#E6E6E7',
    },
    buttonLeft: {
        flex: 1,
    },
    buttonText: {
        fontFamily: FONTS.regular,
        fontSize: FONTS.size.md,
        color: COLORS.blackText,
    },
    reportCount: {
        fontFamily: FONTS.light,
        fontSize: FONTS.size.sm,
        color: COLORS.blackText,
        opacity: 0.7,
        marginTop: 4,
    },
    arrowIcon: {
        fontFamily: FONTS.regular,
        fontSize: 24,
        color: COLORS.blackText,
        opacity: 0.5,
    },
    buttonDate: {
        fontFamily: FONTS.light,
        fontSize: FONTS.size.sm,
        color: COLORS.blackText,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontFamily: FONTS.regular,
    }
});

export default Body;