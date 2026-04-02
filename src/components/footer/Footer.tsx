import { EnvelopeIcon, GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"

function Footer() {

    let data = new Date().getFullYear()

    return (
        <>
            <div className="flex justify-center bg-indigo-900 text-white">
                <div className="container flex flex-col items-center py-4">
                    <p className="text-xl font-bold">
                        Blog Pessoal - Desenvolvido por Jeaninny Teixeira | Copyright: {data}
                    </p>
                    <p className="text-lg"> Redes Sociais</p>
                    <div className="flex gap-2">
                        <LinkedinLogoIcon size={48} weight="bold" />
                        <GithubLogoIcon size={48} weight="bold" />
                        <EnvelopeIcon size={48} weight="bold" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer