import SelectorPersona from "./SelectorPersona"

const InfoPersona = () => {
    return (
        <div className="h-full w-full flex flex-col justify-end items-center absolute bottom-40">
            <SelectorPersona
                items={[
                    { id: "1", label: "Brothers" },
                    { id: "2", label: "Otro" },
                    { id: "2", label: "Otro" }
                ]}
                className="z-50 translate-y-10 translate-x-50"
                defaultIndex={0}
            />
            <div className="flex relative w-full bg-white text-black border-t-3 border-red-600 pt-8 pb-5 -rotate-5 -skew-x-10">
                <div className="w-full">
                    <div className="bg-black text-white h-20 flex items-end justify-end">
                        <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl w-4xl text-center mr-20">
                            Description
                        </span>
                    </div>
                    <div className="text-black flex items-center justify-end mt-5">
                        <div className="w-2xl mx-20 flex gap-2">
                            <span className="text-sm w-fit h-fit rounded-full border-2 border-gray-600 px-5 text-gray-600">
                                info
                            </span>
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                                Hi. I'm Bruno Sanchez, a creative <span className="text-blue-700 font-bold">Software Engineer</span> passionate about technology.
                            </p>
                        </div>
                    </div>
                    <div className="text-gray-500 flex items-center justify-end">
                        <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-9xl w-3xl font-bold mr-20">
                            THEURGY
                        </span>
                    </div>
                </div>
                <div className="w-fit flex">
                    <h1 className="text-[300px] font-bold text-black bg-white" style={{ lineHeight: '0.8' }}>
                        3
                    </h1>
                    <div className="w-30">
                        <div className="bg-black h-20" />
                        <div className="bg-white h-30" />
                        <div className="bg-black h-10" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoPersona