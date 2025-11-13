import React, { useEffect, useRef, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Image, 
} from "react-native";
import HeaderMenu from "@/components/HeaderMenu";
import { Ionicons } from "@expo/vector-icons";

type Message = {
    id: string;
    text: string;
    sender: "user" | "assistant";
    timestamp: string;
    attachmentType?: "image" | "location";
    attachmentData?: string;
};

const INITIAL_MESSAGES: Message[] = [
    {
        id: "1",
        text: "¡Hola! Soy tu Asistente Virtual para la recolección de basura. ¿En qué puedo ayudarte hoy?",
        sender: "assistant",
        timestamp: new Date().toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
        }),
    },
    {
        id: "2",
        text: "¿Puedo subir una foto de la calle con basura acumulada?",
        sender: "user",
        timestamp: new Date().toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
        }),
    },
];

const getCurrentTime = () =>
    new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
    });


export default function AsistenteVirtualScreen() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState("");
    const [isAttachMenuOpen, setIsAttachMenuOpen] = useState(false);
    const flatListRef = useRef<FlatList>(null);

    useEffect(() => {
        if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);


    const handleSendMessage = (
        attachment: { type: "text" | "image" | "location"; data?: string } = {
            type: "text",
        }
    ) => {
        let messageText = inputText.trim();
        if (attachment.type === "text" && messageText === "") return;

        const newUserMessage: Message = {
            id: String(messages.length + 1),
            text:
                messageText ||
                (attachment.type === "image"
                    ? "Adjuntando foto..."
                    : "Compartiendo ubicación..."),
            sender: "user",
            timestamp: getCurrentTime(),
            attachmentType: attachment.type === "text" ? undefined : attachment.type,
            attachmentData: attachment.data,
        };

        setMessages((prevMessages) => [...prevMessages, newUserMessage]);
        setInputText("");
        setIsAttachMenuOpen(false);

        setTimeout(() => {
            const assistantResponseText = simulateAssistantResponse(
                newUserMessage.text,
                newUserMessage.attachmentType
            );
            const newAssistantMessage: Message = {
                id: String(messages.length + 2),
                text: assistantResponseText,
                sender: "assistant",
                timestamp: getCurrentTime(),
            };
            setMessages((prevMessages) => [...prevMessages, newAssistantMessage]);
        }, 800);
    };

    const handleMenuAction = (action: "file" | "location") => {
        setIsAttachMenuOpen(false);
        if (action === "file") {
            alert("Abriendo selector de archivos... (Simulación)");
            handleSendMessage({ type: "image", data: "Foto_001.jpg" });
        } else if (action === "location") {
            alert("Compartiendo ubicación actual... (Simulación)");
            handleSendMessage({ type: "location", data: "Lat: 13.79, Lon: -88.89" });
        }
    };

    const simulateAssistantResponse = (
        userText: string,
        attachmentType?: "image" | "location"
    ): string => {
        if (attachmentType === "image") {
            return "¡Gracias por la evidencia! La hemos registrado y notificaremos al equipo de recolección.";
        }
        if (attachmentType === "location") {
            return "¡Ubicación recibida! Esto nos ayuda a priorizar la ruta y verificar el servicio.";
        }

        const text = userText.toLowerCase();

        if (text.includes("horario") || text.includes("días")) {
            return "El horario es de lunes a viernes a partir de las 6:00 AM. La hora varía según la ruta.";
        }
        return "Disculpa, no estoy seguro de cómo responder a eso. ¿Puedes preguntar sobre horarios, ubicación o quejas?";
    };

    const renderChatItem = ({ item }: { item: Message }) => {
        const isUser = item.sender === "user";
        const isAttachment =
            item.attachmentType === "image" || item.attachmentType === "location";

        return (
            <View
                style={[
                    styles.messageContainer,
                    isUser ? styles.userContainer : styles.assistantContainer,
                ]}
            >
                <View
                    style={[
                        styles.bubble,
                        isUser ? styles.userBubble : styles.assistantBubble,
                    ]}
                >
                    <Text style={isUser ? styles.userText : styles.assistantText}>
                        {item.text}
                    </Text>

                    {isAttachment && (
                        <View style={styles.attachmentView}>
                            <Ionicons
                                name={
                                    item.attachmentType === "image"
                                        ? "image-outline"
                                        : "location-outline"
                                }
                                size={20}
                                color={isUser ? "white" : "#67978dff"}
                            />
                            <Text
                                style={
                                    isUser
                                        ? styles.attachmentTextUser
                                        : styles.attachmentTextAssistant
                                }
                            >
                                {item.attachmentType === "image"
                                    ? "Evidencia Enviada"
                                    : "Ubicación Enviada"}
                            </Text>
                        </View>
                    )}
                </View>
                <Text style={isUser ? styles.userTimestamp : styles.assistantTimestamp}>
                    {item.timestamp}
                </Text>
            </View>
        );
    };

    const renderAttachMenu = () => (
        <View style={styles.attachMenuContainer}>
            <TouchableOpacity
                style={styles.menuOption}
                onPress={() => handleMenuAction("location")}
            >
                <Ionicons name="map-outline" size={24} color="#007BFF" />
                <Text style={styles.menuOptionText}>Compartir Ubicación</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuOption}
                onPress={() => handleMenuAction("file")}
            >
                <Ionicons name="attach-outline" size={24} color="#007BFF" />
                <Text style={styles.menuOptionText}>Adjuntar Archivos</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.fullContainer}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 130 : 20}
        >
            <HeaderMenu />

            <View style={styles.logoHeader}>
                <Image 
                    source={require('@/assets/images/ecoSgar.png')} 
                    style={styles.logoImage} 
                    resizeMode="contain"
                />
                <Text style={styles.logoTitle}>EcoSGAR</Text>
            </View>

            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderChatItem}
                keyExtractor={(item) => item.id}
                style={styles.messagesList}
                contentContainerStyle={styles.messagesContent}
            />

            {isAttachMenuOpen && renderAttachMenu()}
          
            <View style={styles.inputBar}>
                
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => setIsAttachMenuOpen(!isAttachMenuOpen)}
                >
                    <Ionicons
                        name={isAttachMenuOpen ? "close-circle" : "add-circle"}
                        size={30}
                        color="#007BFF"
                    />
                </TouchableOpacity>

                <TextInput
                    style={styles.textInput}
                    placeholder="Escribe tu mensaje aquí..."
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={() => handleSendMessage({ type: "text" })}
                    returnKeyType="send"
                />

                
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => handleMenuAction("file")}
                >
                    <Ionicons name="camera-outline" size={24} color="#67978dff" />
                </TouchableOpacity>

               
                <TouchableOpacity
                    style={[
                        styles.sendButton,
                        inputText.trim() === "" && styles.sendButtonDisabled,
                    ]}
                    onPress={() => handleSendMessage({ type: "text" })}
                    disabled={inputText.trim() === ""}
                >
                    <Ionicons name="send" size={20} color="white" />
                </TouchableOpacity>
            </View>

            <SafeAreaView style={styles.safeAreaBottom} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    fullContainer: {
        flex: 1,
        backgroundColor: "#f4f4f4",
    },
    
    safeAreaBottom: {
        backgroundColor: "white",
        paddingBottom: Platform.OS === "ios" ? 40 : 35, 
    },
    
    logoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', 
        paddingVertical: 10,
        backgroundColor: '#f4f4f4', 
    },
    logoImage: {
        width: 36, 
        height: 30,
        marginRight: 8, 
    },
    logoTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#333', 
    },
    


    messagesList: { flex: 1, paddingHorizontal: 10 },
    messagesContent: { paddingVertical: 10 },
    messageContainer: { maxWidth: "80%", marginVertical: 5 },
    userContainer: { alignSelf: "flex-end", alignItems: "flex-end" },
    assistantContainer: { alignSelf: "flex-start", alignItems: "flex-start" },
    bubble: { padding: 10, borderRadius: 15, maxWidth: "100%" },
    userBubble: { backgroundColor: "#67978dff", borderBottomRightRadius: 2 },
    assistantBubble: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#ddd",
        borderBottomLeftRadius: 2,
    },
    userText: { color: "white", fontSize: 16 },
    assistantText: { color: "#333", fontSize: 16 },
    attachmentView: {
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        marginTop: 5,
        borderRadius: 5,
        backgroundColor: "rgba(0,0,0,0.1)",
    },
    attachmentTextUser: {
        color: "white",
        fontSize: 12,
        marginLeft: 5,
        fontWeight: "bold",
    },
    attachmentTextAssistant: {
        color: "#67978dff",
        fontSize: 12,
        marginLeft: 5,
        fontWeight: "bold",
    },
    userTimestamp: { fontSize: 10, color: "#777", marginTop: 2, marginRight: 5 },
    assistantTimestamp: {
        fontSize: 10,
        color: "#777",
        marginTop: 2,
        marginLeft: 5,
    },

    
    inputBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "#eee",
    },
    iconButton: { padding: 8 },
    textInput: {
        flex: 1,
        height: 40,
        backgroundColor: "#f0f0f0",
        borderRadius: 20,
        paddingHorizontal: 15,
        marginHorizontal: 5,
        fontSize: 16,
    },
    sendButton: {
        backgroundColor: "#007BFF",
        borderRadius: 50,
        padding: 10,
        marginLeft: 5,
    },
    sendButtonDisabled: { backgroundColor: "#ccc" },

    
    attachMenuContainer: {
        position: "absolute",
        bottom: Platform.OS === "ios" ? 108 : 65, 
        left: 10,
        backgroundColor: "white",
        borderRadius: 8,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        zIndex: 10,
    },
    menuOption: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 5,
        minWidth: 180,
    },
    menuOptionText: { marginLeft: 10, fontSize: 16, color: "#333" },
});