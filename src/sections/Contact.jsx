import { useRef, useState } from "react";
import * as emailjs from '@emailjs/browser';
import {useMediaQuery} from "react-responsive";

const Contact = () => {
    const isMobile = useMediaQuery({ maxWidth: 440});
    const formRef = useRef(null);
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Sending email from:", form.email); // Check the email being sent

        setLoading(true);

        try {
            await emailjs.send(
                'service_qdawanl',
                'template_l45wioe',
                {
                    from_name: form.name,
                    to_name: "Adeniyi",
                    reply_to: form.email,
                    to_email: 'obanlaniyi42@gmail.com',
                    message: form.message
                }, 'ddMccg8aDfcuVdfLl'
            );
            setLoading(false);
            alert('Your message has been sent!');
            setForm({
                name: '',
                email: '',
                message: ''
            });
        } catch (error){
            setLoading(false)
            console.log(error);
            alert('Something went wrong!');
        }
    };

    return (
        <section className="c-space my-5 md:my-20" id={'contact'}>
            <div className="relative flex items-center justify-center flex-col min-h-screen">
                {!isMobile && (<img src={"/assets/terminal.png"} alt={"terminal background"}
                                   className={"absolute inset-0 min-h-screen"}/>)}
                <div className="contact-container">
                    <h3 className="head-text head-text_form">Let&apos;s talk</h3>
                    <p className="text-lg text-white-600 mt-3">
                        I&apo;m excited to hear from you! Whether you have a question, want to collaborate, or just want to
                        say hello, feel free to reach out. I'll get back to you as soon as possible. Let's connect and
                        make something amazing together!
                    </p>

                    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col space-y-4 sm:space-y-7 mt-12">
                        <label>
                            <span className="field-label">Full Name</span>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="field-input_mod"
                                placeholder="John Doe"
                            />
                        </label>
                        <label>
                            <span className="field-label">Email</span>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="field-input_mod"
                                placeholder="johndoe@gmail.com"
                            />
                        </label>
                        <label>
                            <span className="field-label">Your Message</span>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="field-input_mod"
                                placeholder="Hi, I wanna give you a job..."
                            />
                        </label>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                            <img src={'/assets/arrow-up.png'} alt={'arrow-up'} className={"field-btn_arrow"}/>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
