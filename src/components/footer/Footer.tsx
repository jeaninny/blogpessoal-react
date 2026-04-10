import { EnvelopeIcon, GithubLogoIcon, LinkedinLogoIcon, GlobeIcon } from "@phosphor-icons/react"
import { AuthContext } from "../../contexts/AuthContext"
import { useContext, type ReactNode } from "react"

function Footer() {

    let data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
            <div className="w-full flex justify-center px-8"
                style={{
                    background: "linear-gradient(180deg, #151220, #0F0D18)",
                    borderTop: "0.5px solid rgba(255,255,255,0.07)",
                }}>
                <div className="container flex flex-col items-center py-6 gap-3">
                    <p className="text-sm font-medium"
                        style={{ color: "#4B5563" }}>
                        Blog <span style={{ color: "#C4849A" }}>Codex</span> · Desenvolvido por Jeaninny Teixeira · © {data}
                    </p>
                    <div className="flex gap-4">
                        <a href="https://www.linkedin.com/in/jeaninnyteixeira" target="_blank" rel="noreferrer">
                            <LinkedinLogoIcon size={24} weight="bold" style={{ color: "#6B7280" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "#C4849A")}
                                onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")} />
                        </a>
                        <a href="https://github.com/jeaninny" target="_blank" rel="noreferrer">
                            <GithubLogoIcon size={24} weight="bold" style={{ color: "#6B7280" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "#C4849A")}
                                onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")} />
                        </a>
                        <a href="https://jeaninny.github.io/portfolio" target="_blank" rel="noreferrer">
                            <GlobeIcon size={24} weight="bold" style={{ color: "#6B7280" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "#C4849A")}
                                onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")} />
                        </a>
                        <a href="mailto:jeaninny.teixeira@gmail.com">
                            <EnvelopeIcon size={24} weight="bold" style={{ color: "#6B7280" }}
                                onMouseEnter={e => (e.currentTarget.style.color = "#C4849A")}
                                onMouseLeave={e => (e.currentTarget.style.color = "#6B7280")} />
                        </a>
                    </div>
                </div>
            </div>
        )

    }

    return (
        <>
            {component}

        </>
    )
}

export default Footer