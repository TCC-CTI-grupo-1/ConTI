import { Spinner } from "@chakra-ui/react";

const LoadingScreen = () => {

  return (
    <>
    <section className="loading"> 
        <div>
          <div style={{display: 'flex', gap: '15px'}}><h1>Carregando, por favor aguarde...</h1><Spinner size="xl" /></div>
            
            
            <p>Caso demore demais, <a
            onClick={
                () => {
                    window.location.reload();
                }
            }>clique aqui</a> para recarrear a tela</p>
        </div>
        
    </section>
    </>
  )
}

export default LoadingScreen