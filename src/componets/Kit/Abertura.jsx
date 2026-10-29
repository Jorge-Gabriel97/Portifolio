import NavegacaoViva from "./NavegacaoViva";

// Topo de página: o Hero (ou Banner) com a navegação viva ao lado em telas largas
function Abertura({ nav, children }) {
    return (
        <div className="container pt-10">
            <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_220px] xl:gap-3">
                {children}
                <NavegacaoViva nav={nav} />
            </div>
        </div>
    );
}

export default Abertura;
