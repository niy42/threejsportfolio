import { useRef, useState } from "react";

const Contact = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add submit logic here
    };

    return (
        <section className="c-space my-20">
            <div className="relative flex items-center justify-center flex-col min-h-screen">
               <img src={"/assets/terminal.png"} alt={"terminal background"} className={"absolute inset-0 min-h-screen"}/>
                <div className="contact-container">
                    <h3 className="head-text head-text_form">Let&apos;s talk</h3>
                    <p className="text-lg text-white-600 mt-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation laborum.
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
