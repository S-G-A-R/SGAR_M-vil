import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Image, FlatList, TouchableWithoutFeedback, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderMenu from '@/components/HeaderMenu'; 
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native'; 

interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: ImageSourcePropType; 
}

interface ProductRowProps {
    product: Product;
    navigation: NavigationProp<ParamListBase>;
}

const COLOR_GRIS_FONDO = '#f4f4f4';
const COLOR_BLANCO = '#ffffff';
const COLOR_GRIS_TEXTO = '#333333';
const COLOR_BORDE = '#cccccc';
const COLOR_BUSCAR_BOTON = '#007bff'; 
const COLOR_MENU_BOTON = '#1e90ff'; 

const mockProducts: Product[] = [
    { id: '1', name: 'Cepillo Ecológico', price: 50.00, imageUrl: require("../../assets/images/producto1.jpg") }, 
    { id: '2', name: 'Detergente Bio', price: 75.50, imageUrl: require("../../assets/images/producto2.png") }, 
    { id: '3', name: 'Guantes Reciclados', price: 40.00, imageUrl: require("../../assets/images/producto3.png") }, 
    { id: '4', name: 'Desinfectante Floral', price: 60.00, imageUrl: require("../../assets/images/producto4.jpg") }, 
    { id: '5', name: 'Esponja de Fibra', price: 20.00, imageUrl: require("../../assets/images/producto5.jpg") }, 
];


const categories = [
    { label: 'Detergentes', value: 'Detergentes' },
    { label: 'Escobas', value: 'Escobas' },
    { label: 'Guantes', value: 'Guantes' },
    { label: 'Desinfectantes', value: 'Desinfectantes' },
    { label: 'Todas las Categorías', value: 'Todas' }, 
];


const ProductRow: React.FC<ProductRowProps> = ({ product, navigation }) => {
    const handleViewMore = () => {
        navigation.navigate('menu/productoDetalle' as any, { 
            productId: product.id, 
            productName: product.name,
            imageUrl: product.imageUrl, 
        });
    };

    return (
        <View style={productStyles.rowContainer}>
            <Image source={product.imageUrl} style={productStyles.image} /> 
            <View style={productStyles.infoContainer}>
                <Text style={productStyles.name}>{product.name}</Text>
                <Text style={productStyles.price}>${product.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={productStyles.viewMoreButton} onPress={handleViewMore}>
                <Text style={productStyles.viewMoreText}>Ver más</Text>
            </TouchableOpacity>
        </View>
    );
};

export default function PublicidadProducto() {
    const navigation = useNavigation<NavigationProp<ParamListBase>>(); 
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('Todas'); 
    const [menuVisible, setMenuVisible] = useState<boolean>(false); 

    const [currentPage, setCurrentPage] = useState<number>(1);
    const productsPerPage = 4;
    const totalPages = Math.ceil(mockProducts.length / productsPerPage);

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = mockProducts.slice(startIndex, endIndex);

    const handleSearch = (): void => {
        console.log('Buscando productos con término:', searchTerm);
    };

    const handleCategorySelect = (value: string): void => {
        setSelectedCategory(value);
        setMenuVisible(false); 
        console.log('Filtrando por categoría:', value);
    };
    
    const getSelectedLabel = () => {
        const cat = categories.find(c => c.value === selectedCategory);
        
        if (cat && cat.value === 'Todas') {
             return 'Categorías'; 
        }
        return cat ? cat.label : 'Categorías';
    };

    const handlePageChange = (page: number): void => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const paginationButtons: React.ReactNode[] = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationButtons.push(
            <TouchableOpacity 
                key={i} 
                style={[styles.paginationButton, currentPage === i && styles.paginationActive]}
                onPress={() => handlePageChange(i)}
            >
                <Text style={[styles.paginationText, currentPage === i && styles.paginationActiveText]}>{i}</Text>
            </TouchableOpacity>
        );
    }

    const handleOutsidePress = () => {
        if (menuVisible) {
            setMenuVisible(false);
        }
    };

    return (
        <SafeAreaView style={styles.fullContainer}>
            <HeaderMenu /> 
            
            <View style={styles.controlBar}>
                
                <View style={styles.searchBarRow}> 
                    <View style={styles.searchInputContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Buscar Productos..."
                            value={searchTerm}
                            onChangeText={setSearchTerm}
                        />
                    </View>
                    <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                        <Text style={styles.searchButtonText}>Buscar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.menuBarRow}> 
                    <Text style={styles.filterLabel}>Filtrar por:</Text>
                    
                    <View style={styles.menuContainer}> 
                        
                        <TouchableOpacity 
                            style={[styles.menuButton, styles.fixedMenuButton]} 
                            onPress={() => setMenuVisible(!menuVisible)}
                        >
                            <Ionicons 
                                name="chevron-down" 
                                size={18} 
                                color={COLOR_BLANCO} 
                                style={styles.menuIcon}
                            />
                            <Text style={styles.menuButtonText}>
                                {getSelectedLabel()}
                            </Text>
                        </TouchableOpacity>

                        {menuVisible && (
                            <View style={styles.dropdownMenu}>
                                {categories.map((cat, index) => (
                                    <TouchableOpacity 
                                        key={cat.value} 
                                        style={styles.dropdownItem} 
                                        onPress={() => handleCategorySelect(cat.value)}
                                    >
                                        <Text style={styles.dropdownItemText}>
                                            {cat.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </View>
            
            <TouchableWithoutFeedback onPress={handleOutsidePress} style={{ flex: 1 }}>
                <FlatList
                    data={currentProducts}
                    style={styles.productList} 
                    renderItem={({ item }) => <ProductRow product={item} navigation={navigation} />}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    ListFooterComponent={() => (
                        <View style={styles.paginationContainer}>
                            {paginationButtons}
                        </View>
                    )}
                />
            </TouchableWithoutFeedback>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    fullContainer: { 
        flex: 1, 
        backgroundColor: COLOR_GRIS_FONDO, 
    },
    controlBar: {
        backgroundColor: COLOR_BLANCO,
        padding: 15,
        borderBottomWidth: 1, 
        borderBottomColor: COLOR_BORDE,
    },
    
    searchBarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10, 
    },
    searchInputContainer: {
        flex: 1, 
    },
    searchInput: {
        height: 40,
        backgroundColor: COLOR_GRIS_FONDO,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10, 
        borderColor: COLOR_BORDE,
        borderWidth: 1,
    },
    searchButton: {
        backgroundColor: COLOR_BUSCAR_BOTON,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    searchButtonText: {
        color: COLOR_BLANCO,
        fontWeight: 'bold',
    },
    
    menuBarRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center', 
    },
    filterLabel: {
        fontSize: 14,
        color: COLOR_GRIS_TEXTO,
        fontWeight: 'bold',
        marginRight: 20, 
    },
    
    menuContainer: {
        zIndex: 10, 
    },
    fixedMenuButton: {
        minWidth: 150, 
        justifyContent: 'center',
    },
    menuButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR_MENU_BOTON, 
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    menuIcon: {
        marginRight: 5,
    },
    menuButtonText: {
        color: COLOR_BLANCO,
        fontWeight: 'bold',
        fontSize: 14,
    },
    dropdownMenu: {
        position: 'absolute',
        top: 45, 
        left: 0, 
        width: 180, 
        backgroundColor: COLOR_BLANCO,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, 
        paddingVertical: 5,
        zIndex: 20,
    },
    dropdownItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLOR_GRIS_FONDO,
    },
    dropdownItemText: {
        fontSize: 14,
        color: COLOR_GRIS_TEXTO,
    },
    
    productList: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 14,
        paddingVertical: 10,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 1,
    },
    paginationButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
        borderRadius: 5,
        backgroundColor: COLOR_BLANCO,
        borderWidth: 1,
        borderColor: COLOR_BORDE,
    },
    paginationActive: {
        backgroundColor: COLOR_BUSCAR_BOTON,
        borderColor: COLOR_BUSCAR_BOTON,
    },
    paginationText: {
        color: COLOR_GRIS_TEXTO,
    },
    paginationActiveText: {
        color: COLOR_BLANCO,
        fontWeight: 'bold',
    },
    arrowButton: {
        padding: 5,
    },
});

const productStyles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        backgroundColor: COLOR_BLANCO,
        borderRadius: 5,
        padding: 30,
        marginBottom: 10,
        alignItems: 'center',
        borderWidth: 0,
        borderColor: COLOR_BORDE,
    },
    image: {
        width: 70,
        height: 70,
        marginRight: 10,
        borderRadius: 1,
        backgroundColor: COLOR_GRIS_FONDO, 
        borderWidth: 1,
        borderColor: COLOR_BORDE,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        color: COLOR_GRIS_TEXTO,
    },
    price: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    viewMoreButton: {
        backgroundColor: COLOR_BLANCO,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLOR_BUSCAR_BOTON,
    },
    viewMoreText: {
        color: COLOR_BUSCAR_BOTON,
        fontWeight: 'bold',
    },
});