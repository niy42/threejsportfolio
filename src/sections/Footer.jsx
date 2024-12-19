export default function Footer() {
    return(
        <section>
            <footer
                className={"c-space pt-7 pb-3 border-t border-black-300 flex justify-between items-center flex-wrap gap-5"}>
                <div className={"text-white-500 flex gap-2"}>
                    <p>Terms & Conditions</p>
                    <p>|</p>
                    <p>Privacy Policy</p>

                </div>
                <div className={"flex gap-3"}>
                    <a
                        href={"https://github.com/niy42"}
                        className={"social-icon inline-block"}
                        rel={"noreferrer noopener"}
                    >
                        <img src={"assets/github.svg"} alt={"Github"} className={"w-1/2 h-1/2 cursor-pointer"}/>
                    </a>
                    <a
                        href={"https://x.com/@yung_0x7"}
                        className={"social-icon inline-block"}
                        rel={"noopener noreferrer"}
                    >
                        <img src={"assets/xcom.svg"} alt={"X"} className={"w-1/2 h-1/2 cursor-pointer"}/>
                    </a>
                    <a
                        href={"https://www.linkedin.com/in/adeniyi-obanla-3a137914b/"}
                        className={"social-icon inline-block"}
                        rel={"noreferrer noopener"}
                    >
                        <img src={"assets/linked.svg"} alt={"LinkedIn"} className={"w-1/2 h-1/2 cursor-pointer"}/>
                    </a>
                </div>


                <p className={"text-white-600"}><span className={"text-lg"}>©</span> 2024 Adeniyi. All rights reserved.
                </p>
            </footer>
        </section>
    )
}