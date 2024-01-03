import AboutUsCard from "./AboutUsCard";

export default function AboutUs({ data }) {
    return (
        <section className="mt-4 select-none" id="about-us">
            <h5 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">أعضاء الفريق</h5>
            <div className="grid gap-8 mt-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {
                    data.map((e, idx) => <AboutUsCard key={idx} image={e.image} number={idx + 1} title={e.title} subTitle={e.subTitle} />)
                }
            </div>
        </section>

    )
}
