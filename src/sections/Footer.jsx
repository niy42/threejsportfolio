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
                    <div className={"social-icon"}>
                        <img src={"assets/github.svg"} alt={"github"} className={"w-1/2 h-1/2"}/>
                    </div>
                    <div className={"social-icon"}>
                        <img src={"assets/xcom.svg"} alt={"X"} className={"w-1/2 h-1/2"}/>
                    </div>
                    <div className={"social-icon"}>
                        <img src={"assets/linked.svg"} alt={"LinkedIn"} className={"w-1/2 h-1/2"}/>
                    </div>
                </div>
                    <p className={"text-white-600"}> <span className={"text-lg"}>©</span> 2024 Adeniyi. All rights reserved.</p>
            </footer>
        </section>
    )
}