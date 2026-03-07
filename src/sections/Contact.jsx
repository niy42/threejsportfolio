import { useEffect, useRef, useState, useCallback } from "react";
import emailjs from "@emailjs/browser";
import { useMediaQuery } from "react-responsive";
import { TypeAnimation } from "react-type-animation";
import { enqueueSnackbar } from "notistack";

const Contact = () => {
  const isMobile = useMediaQuery({ maxWidth: 440 });
  const sectionRef = useRef(null);
  const [showAnimation, setShowAnimation] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await emailjs.send(
        "service_qdawanl",
        "template_l45wioe",
        {
          from_name: form.name,
          reply_to: form.email,
          to_email: "obanlaniyi42@gmail.com",
          message: form.message,
        },
        "ddMccg8aDfcuVdfLl",
      );

      enqueueSnackbar("Message sent successfully! 🚀", {
        variant: "success",
      });

      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      // console.error(error);

      enqueueSnackbar("Failed to send message. Please try again.", {
        variant: "error",
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowAnimation(true);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="c-space my-5 md:my-20" id="contact">
      <div className="relative flex items-center justify-center flex-col h-full">
        {!isMobile && (
          <img
            src="/assets/terminal.png"
            alt="terminal background"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-contain"
          />
        )}

        <div className="contact-container md:py-12 pt-15">
          <h3 className="head-text sm:head-text_form max-sm:mt-16">
            Let's talk
          </h3>

          <p className="text-sm sm:text-lg text-white-600 mt-3">
            Let&apos;s spark something extraordinary! Drop me a message about
            your project,&nbsp;
            {showAnimation && (
              <TypeAnimation
                sequence={[
                  "collaboration idea, or even just to chat tech – I respond faster than a blockchain confirmation.",
                  5000,
                ]}
                cursor
                repeat={0}
              />
            )}
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-6 mt-12"
          >
            <label>
              <span className="field-label">Full Name</span>

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="field-input_form"
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
                className="field-input_form"
                placeholder="johndoe@gmail.com"
              />
            </label>

            <label>
              <span className="field-label">Your Message</span>

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
                className="field-input_form"
                placeholder="Tell me about your project, idea, or how I can help..."
              />
            </label>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
