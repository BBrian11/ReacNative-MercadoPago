import  React ,  {  useState  }  de  'react' ;
importar  {  Text ,  Alert ,  View ,  ActivityIndicator ,  TouchableOpacity  }  desde  'react-native' ;
import  {  MainContainer ,  Title ,  InputText ,  PersonalButton ,  HeaderCheckout  }  desde  './styles' ;
importar  {  WebView  }  desde  'react-native-webview' ;

 función predeterminada de  exportación Checkout ( ) {  

    const  [ PaymentID ,  setIdPayment ]  =  useState ( "1" )
    const  [ emailPayment ,  setEmailPayment ]  =  useState ( "meuemail@gmail.com" )
    const  [ descricaoPagamento ,  setDescricaoPagamento ]  =  useState ( "Venta de productos digitales" )
    const  [ vlrPagamento ,  setVlrPagamento ]  =  useState ( "5.00" )
    const  [ showCheckout ,  setShowCheckout ]  =  useState ( falso )

    const  stateChange  =  ( estado )  =>  {
        interruptor  ( estado . título )  {
            caso  'éxito' :
                setShowCheckout ( falso )
                Alerta . alerta ( "¡Pago aprobado!" ,  `Recibimos su pago de $ { vlrPayment } ` )
                romper ;
            caso  'pendiente' :
                setShowCheckout ( falso )
                Alerta . alerta ( "¡Pago pendiente!" ,  `Su pago de $ { vlrPayment } está pendiente de procesamiento, una vez que se procese, ¡procederemos con el pedido!` )
                romper ;
            caso  'falla' :
                setShowCheckout ( falso )
                Alerta . alerta ( "¡Pago no aprobado!" ,  'Verifique sus datos e intente nuevamente' )
                romper ;
        }
    }

    if  ( ! showCheckout )  {
        volver  (

            < MainContainer >
                < Título > Prototipo de pago < / Título >
                < InputText  value = { Payment id }  onChangeText = { ( text )  =>  setIdPayment ( text ) }  placeholder = { 'Enter product id' }  keyboardType = { ' numeric ' } > < / InputText >
                < InputText  value = { emailPayment }  onChangeText = { ( text )  =>  setEmailPayment ( text ) }  placeholder = { 'Ingrese la dirección de correo electrónico del comprador' }  keyboardType = { 'email-address' } > < / InputText >
                < InputText  value = { descricaoPagamento }  onChangeText = { ( text )  =>  setDescricaoPagamento ( text ) }  placeholder = { 'Ingrese la descripción de la venta' } > < / InputText >
                < InputText  value = { vlrPagamento }  onChangeText = { ( text )  =>  setVlrPagamento ( text ) }  placeholder = { 'Ingrese el valor del producto' }  keyboardType = { ' numeric ' } > < / InputText >
                < PersonalButton  onPress = { ( )  =>  setShowCheckout ( true ) } > < Texto > Pagar R $ { vlrPayment } < / Text > < / PersonalButton >

            < / MainContainer >
        )
    }  más  {

        volver  (
            < Ver  estilo = { {  flex : 1 ,  justifyContent : 'center'  } } >
                < HeaderCheckout >
                    < TouchableOpacity  onPress = { ( )  =>  setShowCheckout ( false ) } > < Estilo de texto  = { { fontSize : 20 , color : 'white' } } > { "<<" } < / Text > < / TouchableOpacity >   
                    < Título > Pago del pedido < / Título >
                < / HeaderCheckout >
                < WebView
                    fuente = { {  uri : `<url_api_git_pod> / pagos / pago / $ { idPagamento } / $ { emailPagamento } / $ { descriptionPagamento } / $ { vlrPagamento } `  } }
                    onNavigationStateChange = { state  =>  stateChange ( state ) }
                    startInLoadingState = { true }
                    renderLoading = { ( )  =>  < ActivityIndicator > < / ActivityIndicator > }
                / >

            < / Ver >
        )

    }
}