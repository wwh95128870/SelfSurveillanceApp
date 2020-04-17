import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#FFF"
    },
    text:{
        color:"#161924",
        fontSize:20,
        fontWeight:"500"
    },
    screen:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    menuBar:{
        alignItems:"flex-end",
        flexDirection: 'row',
        justifyContent:"space-between",
        textAlign: 'center',
        paddingTop:20,
        
    },
    appHeader:{
        fontSize:23,
        color: "#161924",
        textAlign: 'center',
        flex:1,
    },
    appMoreIcon:{
        fontSize:24,
        color: "#161924",
        flex:1,
        textAlign: 'left',
    }
})