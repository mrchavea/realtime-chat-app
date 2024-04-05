export default function AuthLoadingSkeleton () {
    return (
        <>
            <section>
                <div className="w-[60%] h-8 mb-2 bg-slate-200 animate-pulse"/>
                <div className="w-[80%] h-5 mb-4 bg-slate-200 animate-pulse"/>
                <div className="w-full h-12 mb-2 bg-slate-200 animate-pulse"/>
                <div className="w-full h-12 mb-2 bg-slate-200 animate-pulse"/>
            </section>

            <section className="mt-6">
                <div className="w-full h-12 mb-2 bg-slate-200 animate-pulse"/>
                <div className="w-full h-12 mb-2 bg-slate-200 animate-pulse"/>
            </section>

        </>
    )
}