function Banner({ title, image }) {
    return (
        <div
            className="relative flex h-56 items-end overflow-hidden bg-cover bg-center md:h-72"
            style={{ backgroundImage: `url(/${image})` }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-950/20" />
            <div className="container relative pb-10">
                <h1 className="font-serif text-4xl text-white md:text-5xl">{title}</h1>
            </div>
        </div>
    )
}

export default Banner;
