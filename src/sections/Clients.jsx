import React, { useEffect } from 'react';
import { clientReviews } from "../constants/index.js";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Clients = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            easing: 'ease-in-out',
        });
    }, []);

    return (
        <section className={"c-space my-20"} data-aos="fade-up">
            <h3 className={"head-text"} data-aos="fade-down">
                Hear from My Clients
            </h3>

            <div className={"client-container"}>
                {clientReviews.map(({ id, name, review, img, position }, index) => {
                    return (
                        <div key={id} className={"client-review"} data-aos="fade-up" data-aos-delay={index * 100}>
                            <div>
                                <p className={"text-white font-light"}>{review}</p>
                                <div className={"client-content"}>
                                    <div className={"flex gap-3"}>
                                        <img src={img} alt={name} className={"w-12 h-12 rounded-full"} data-aos="zoom-in" />
                                        <div className={"flex flex-col"}>
                                            <p className={"font-semibold text-white-800"}>{name}</p>
                                            <p className={"text-white-500 md-text-base text-sm text-wrap"}>{position}</p>
                                        </div>
                                    </div>

                                    <div className={"flex self-end items-center gap-2"}>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <img
                                                key={index}
                                                src={"/assets/star.png"}
                                                alt={"star"}
                                                className={"w-5 h-5"}
                                                data-aos="fade-up"
                                                data-aos-delay={index * 100}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Clients;
