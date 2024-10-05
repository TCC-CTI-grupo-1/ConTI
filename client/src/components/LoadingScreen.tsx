const LoadingScreen = () => {

  return (
    <>
    <section className="loading"> 
        <div>
            <h1>Carregando, por favor aguarde...</h1>
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