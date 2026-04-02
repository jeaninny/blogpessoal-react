function Home() {
    return (
        <>
            <div className="bg-indigo-900 flex justify-center">
                <div className='container grid grid-cols-1 md:grid-cols-2 text-white'>

                    <div className="flex justify-center pb-4 md:pb-0 order-first md:order-last">
                        <img
                            src="https://i.imgur.com/fyfri1v.png"
                            alt="Imagem Página Home"
                            className='w-1/2 md:w-2/3'
                        />
                    </div>

                    <div className="flex flex-col gap-4 items-center justify-center py-4 text-center md:text-left order-last md:order-first">
                        <h2 className='text-3xl md:text-5xl font-bold'>
                            Seja Bem-Vindo!
                        </h2>
                        <p className='text-base md:text-xl'>
                            Expresse aqui seus pensamentos e opiniões
                        </p>

                        <div className="flex justify-around gap-4">
                            <div className='rounded text-white 
                                            border-white border-solid border-2 py-2 px-4'>
                                Nova Postagem
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Home