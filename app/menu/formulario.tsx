import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderMenu from '@/components/HeaderMenu'; 


type Queja = {
    id: string;
    titulo: string;
    estado: 'Revisado' | 'Pendiente' | 'Denegado';
    fecha: string;
    detalle: string;
    anonimo: boolean;
    adjunto?: string;
};

const DUMMY_QUEJAS: Queja[] = [
    { id: '1', titulo: 'Retraso en la ruta del lunes', estado: 'Revisado', fecha: '10/Nov/2025', detalle: 'El camión pasó 2 horas más tarde de lo habitual en la Colonia Vista Hermosa.', anonimo: true },
    { id: '2', titulo: 'Mala gestión de residuos peligrosos', estado: 'Pendiente', fecha: '08/Nov/2025', detalle: 'Vi que mezclaron residuos de hospital con la basura común cerca del Mercado Central.', anonimo: true, adjunto: 'Foto_MalaGestion.jpg' },
    { id: '3', titulo: 'Falta de contenedores en el parque', estado: 'Denegado', fecha: '05/Nov/2025', detalle: 'Se solicitan más basureros grandes en el parque principal.', anonimo: true },
    { id: '4', titulo: 'Ruidos fuertes a las 5 am', estado: 'Revisado', fecha: '01/Nov/2025', detalle: 'El personal está haciendo mucho ruido al recolectar en horas de la madrugada.', anonimo: true },
    { id: '5', titulo: 'Basura tirada en la calle', estado: 'Pendiente', fecha: '28/Oct/2025', detalle: 'Los trabajadores dejaron una bolsa rota y la basura esparcida en la acera.', anonimo: true },
];

const SITUACION_OPCIONES = [
    'Seleccione tipo de situación',
    'Retraso en Recolección',
    'Manejo Incorrecto de Basura',
    'Daño a Propiedad',
    'Conducta del Personal',
    'Falta de Equipo (Contenedores)',
    'Otro'
];



const getStatusStyle = (estado: Queja['estado']) => {
    switch (estado) {
        case 'Revisado': return { backgroundColor: '#67978dff', color: 'white' };
        case 'Pendiente': return { backgroundColor: '#FFC107', color: 'black' };
        case 'Denegado': return { backgroundColor: '#DC3545', color: 'white' };
        default: return { backgroundColor: '#ccc', color: 'black' };
    }
};



export default function QuejasScreen() {
    const [quejas, setQuejas] = useState(DUMMY_QUEJAS);
    const [searchText, setSearchText] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedQueja, setSelectedQueja] = useState<Queja | null>(null);
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    
    const [formTitulo, setFormTitulo] = useState('');
    const [formTipo, setFormTipo] = useState(SITUACION_OPCIONES[0]);
    const [formDetalle, setFormDetalle] = useState('');
    const [formAdjunto, setFormAdjunto] = useState<string | null>(null);

    
    const filteredQuejas = quejas.filter(queja =>
        queja.titulo.toLowerCase().includes(searchText.toLowerCase()) ||
        queja.detalle.toLowerCase().includes(searchText.toLowerCase())
    );

    
    const handleViewQueja = (queja: Queja) => {
        setSelectedQueja(queja);
    };

    const handleAttachFile = () => {
        alert('Abriendo selector de archivos... (Solo simulación)');
        setFormAdjunto('evidencia-' + Date.now() + '.jpg');
    };

    const handleCreateQueja = () => {
        if (!formTitulo || formTipo === SITUACION_OPCIONES[0] || !formDetalle) {
            alert('Por favor, complete el Título, el Tipo de Situación y la Descripción.');
            return;
        }

        const newQueja: Queja = {
            id: String(quejas.length + 1),
            titulo: formTitulo + ` (${formTipo})`, 
            estado: 'Pendiente', 
            fecha: new Date().toLocaleDateString('es-ES'),
            detalle: formDetalle,
            anonimo: true,
            adjunto: formAdjunto || undefined,
        };

        setQuejas([newQueja, ...quejas]);
        
        setFormTitulo('');
        setFormTipo(SITUACION_OPCIONES[0]);
        setFormDetalle('');
        setFormAdjunto(null);
        setIsFormOpen(false);
        alert('Queja enviada exitosamente. Estado inicial: Pendiente.');
    };
    
    const renderSituationPicker = () => (
        <View>
            <TouchableOpacity 
                style={[styles.formInput, styles.pickerDisplay, formTipo === SITUACION_OPCIONES[0] && styles.pickerPlaceholder]}
                onPress={() => setIsPickerOpen(true)}
            >
                <Text style={formTipo === SITUACION_OPCIONES[0] ? styles.pickerPlaceholderText : styles.pickerText}>
                    {formTipo}
                </Text>
                <Ionicons name="caret-down-outline" size={16} color="#777" />
            </TouchableOpacity>

            <Modal
                transparent={true}
                visible={isPickerOpen}
                onRequestClose={() => setIsPickerOpen(false)}
                animationType="fade"
            >
                <TouchableOpacity style={styles.pickerModalOverlay} onPress={() => setIsPickerOpen(false)}>
                    <View style={styles.pickerOptionsContainer}>
                        {SITUACION_OPCIONES.map((opcion, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.pickerOption}
                                onPress={() => {
                                    setFormTipo(opcion);
                                    setIsPickerOpen(false);
                                }}
                            >
                                <Text style={styles.pickerOptionText}>{opcion}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );

    const renderQuejaItem = ({ item }: { item: Queja }) => (
        <View style={styles.quejaItem}>
            <View style={styles.quejaContent}>
                <Text style={styles.quejaTitulo}>{item.titulo}</Text>
                <Text style={styles.quejaFecha}>Publicado: {item.fecha}</Text>
            </View>
            <View style={styles.quejaActions}>
                <Text style={[styles.quejaEstado, getStatusStyle(item.estado)]}>
                    {item.estado}
                </Text>
                <TouchableOpacity 
                    style={styles.viewButton} 
                    onPress={() => handleViewQueja(item)}
                >
                    <Ionicons name="eye-outline" size={20} color="#007BFF" />
                </TouchableOpacity>
            </View>
        </View>
    );

    
    return (
        <View style={styles.fullContainer}>
            <HeaderMenu />
            
            <View style={styles.container}>
                
                <View style={styles.headerControls}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar quejas anónimas..."
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    <TouchableOpacity style={styles.createButton} onPress={() => setIsFormOpen(true)}>
                        <Ionicons name="add-circle-outline" size={24} color="white" />
                        <Text style={styles.createButtonText}>Crear Queja</Text>
                    </TouchableOpacity>
                </View>
                
            
                <Text style={styles.listTitle}>Quejas Anónimas de Ciudadanos</Text>
                <FlatList
                    data={filteredQuejas}
                    renderItem={renderQuejaItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<Text style={styles.emptyList}>No se encontraron quejas.</Text>}
                    style={styles.list}
                />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={isFormOpen}
                onRequestClose={() => setIsFormOpen(false)}
            >
                <View style={styles.modalOverlay}>
                    <ScrollView contentContainerStyle={styles.formScrollContainer}>
                        <View style={styles.formContainer}>
                            <Text style={styles.formTitle}>Formulario de Queja Anónima</Text>
                            
                            
                            <Text style={styles.formLabel}>Título de la Queja:</Text>
                            <TextInput
                                style={styles.formInput}
                                placeholder="Ej: Recolección irregular en mi calle"
                                value={formTitulo}
                                onChangeText={setFormTitulo}
                            />

                         
                            <Text style={styles.formLabel}>Tipo de Situación:</Text>
                            {renderSituationPicker()}


                        
                            <Text style={styles.formLabel}>Descripción detallada:</Text>
                            <TextInput
                                style={styles.formDetailInput}
                                placeholder="Detalle completo de la queja..."
                                value={formDetalle}
                                onChangeText={setFormDetalle}
                                multiline={true}
                                numberOfLines={4}
                                textAlignVertical="top"
                            />
                          
                            <Text style={styles.formLabel}>Subir Evidencia (.mp4, .jpg, .png):</Text>
                            <TouchableOpacity style={styles.attachButton} onPress={handleAttachFile}>
                                <Ionicons name="cloud-upload-outline" size={20} color="#007BFF" />
                                <Text style={styles.attachButtonText}>Adjuntar archivo</Text>
                            </TouchableOpacity>
                            {formAdjunto && (
                                <Text style={styles.fileNameText}>Archivo adjunto: {formAdjunto}</Text>
                            )}
                            
                            
                            <View style={styles.formActions}>
                                <TouchableOpacity style={styles.cancelFormButton} onPress={() => setIsFormOpen(false)}>
                                    <Text style={styles.cancelFormButtonText}>CANCELAR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.submitButton} onPress={handleCreateQueja}>
                                    <Text style={styles.submitButtonText}>ENVIAR</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
            
            
            <Modal
                animationType="fade"
                transparent={true}
                visible={!!selectedQueja}
                onRequestClose={() => setSelectedQueja(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.detailContainer}>
                        <Text style={styles.detailTitle}>Detalle de la Queja</Text>
                        <Text style={styles.detailHeader}>{selectedQueja?.titulo}</Text>
                        
                        <View style={styles.detailStatusRow}>
                            <Text style={styles.detailLabel}>Estado:</Text>
                            <Text 
                                style={[styles.quejaEstado, getStatusStyle(selectedQueja?.estado || 'Pendiente')]}
                            >
                                {selectedQueja?.estado}
                            </Text>
                        </View>
                        
                        <Text style={styles.detailLabel}>Descripción:</Text>
                        <ScrollView style={styles.detailScroll}>
                            <Text style={styles.detailText}>{selectedQueja?.detalle}</Text>
                        </ScrollView>
                        
                        {selectedQueja?.adjunto && (
                            <Text style={styles.detailLabel}>Evidencia: <Text style={{fontWeight: 'normal', color: '#007BFF', fontStyle: 'italic'}}>{selectedQueja.adjunto}</Text></Text>
                        )}


                        <Text style={styles.detailFooter}>
                            Publicado Anónimamente el: {selectedQueja?.fecha}
                        </Text>
                        
                        <TouchableOpacity 
                            style={styles.closeDetailButton} 
                            onPress={() => setSelectedQueja(null)}
                        >
                            <Text style={styles.closeDetailButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    fullContainer: { flex: 1, backgroundColor: '#f4f4f4', },
    container: { flex: 1, paddingHorizontal: 15, paddingVertical: 10, },
    
    
    headerControls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, backgroundColor: 'white', borderRadius: 8, padding: 8, elevation: 2, },
    searchInput: { flex: 1, height: 40, backgroundColor: '#fff', paddingHorizontal: 10, marginRight: 10, borderRadius: 5, borderColor: '#ccc', borderWidth: 1, },
    createButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#67978dff', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 5, },
    createButtonText: { color: 'white', fontWeight: 'bold', marginLeft: 5, },

    
    listTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333', },
    list: { flex: 1, },
    quejaItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: 15, marginBottom: 10, borderRadius: 8, borderLeftWidth: 5, borderLeftColor: '#007BFF', elevation: 1, },
    quejaContent: { flex: 1, marginRight: 10, },
    quejaTitulo: { fontSize: 16, fontWeight: 'bold', color: '#333', },
    quejaFecha: { fontSize: 12, color: '#777', marginTop: 4, },
    quejaActions: { flexDirection: 'row', alignItems: 'center', },
    quejaEstado: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 15, fontSize: 12, fontWeight: 'bold', marginRight: 10, textAlign: 'center', minWidth: 80, },
    viewButton: { padding: 5, },
    emptyList: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#555', },

    
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)', },
    
    
    formScrollContainer: { justifyContent: 'center', flexGrow: 1, },
    formContainer: { width: 350, backgroundColor: 'white', borderRadius: 10, padding: 20, marginVertical: 40, }, // Se usa un ancho fijo para el scroll
    formTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333', },
    formLabel: { fontSize: 14, color: '#555', marginBottom: 5, fontWeight: '600', marginTop: 10, },
    formInput: { height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 15, fontSize: 16, },
    formDetailInput: { height: 100, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, padding: 15, fontSize: 16, textAlignVertical: 'top', },
    

    pickerDisplay: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingHorizontal: 15, 
    },
    pickerPlaceholder: { borderColor: '#DC3545', },
    pickerPlaceholderText: { color: '#777', fontSize: 16, },
    pickerText: { color: '#333', fontSize: 16, },
    pickerModalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)', },
    pickerOptionsContainer: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 10, },
    pickerOption: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee', },
    pickerOptionText: { fontSize: 18, color: '#333', },


    attachButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, backgroundColor: '#E6F0FF', borderRadius: 5, justifyContent: 'center', marginTop: 5, },
    attachButtonText: { color: '#007BFF', fontWeight: 'bold', marginLeft: 8, fontSize: 15, },
    fileNameText: { fontSize: 12, color: '#67978dff', marginTop: 5, textAlign: 'center', fontStyle: 'italic', },

    
    formActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, },
    submitButton: { backgroundColor: '#67978dff', padding: 15, borderRadius: 5, alignItems: 'center', width: '48%', },
    submitButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16, },
    cancelFormButton: { backgroundColor: '#DC3545', padding: 15, borderRadius: 5, alignItems: 'center', width: '48%', },
    cancelFormButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16, },


    detailContainer: { width: '90%', backgroundColor: 'white', borderRadius: 10, padding: 20, maxHeight: '80%', },
    detailTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center', color: '#333', },
    detailHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#007BFF', },
    detailStatusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, },
    detailLabel: { fontSize: 14, fontWeight: 'bold', color: '#555', marginRight: 10, marginBottom: 5, },
    detailScroll: { maxHeight: 150, padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5, marginBottom: 15, },
    detailText: { fontSize: 16, color: '#333', lineHeight: 24, },
    detailFooter: { fontSize: 12, color: '#777', textAlign: 'right', marginTop: 10, marginBottom: 15, },
    closeDetailButton: { backgroundColor: '#DC3545', padding: 15, borderRadius: 5, alignItems: 'center', },
    closeDetailButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16, },
});