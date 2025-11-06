import { useState } from "react";
import axios from "axios";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    const { name, email, phone, message } = formData;

    if(!name.trim() || !email.trim() || !phone.trim() || !message.trim()){
      setStatus("Please fill in all details");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
      setStatus("Please enter a valid email address");
      return;
    }

    try {
      const response = await axios.post("https://vernanbackend.ezlab.in/api/contact-us/", {
        name,
        email,
        phone,
        message,
      });

      if(response.status >= 200 && response.status < 300) {
        setStatus("Form submitted successfully!!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      }else{
        setStatus("Something went wrong. Please try again.");
      }
    } catch(error){
      console.error("API Error", error);
      if(error.response){
        setStatus(`Server error: ${error.response.statusText}`);
      }else{
        setStatus("Network error. please check your connection.");
      }
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col sm:flex-row justify-between items-center px-6 sm:px-16 py-10">
      
      <div className="sm:w-1/2 text-center sm:text-left space-y-6 mb-10 sm:mb-0">
        

        <p className="text-gray-700 leading-relaxed max-w-md mx-auto sm:mx-0 text-[17px]">
          Whether it's an idea or a question - we are just a message away
          <br />
          Let's create something amazing together. <br />
        </p>
      </div>

      
      <div className="bg-white/80 backdrop-blur-sm shadow-md rounded-2xl p-8 w-full max-w-md sm:max-w-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Connect with Us
        </h2>
        <p className="text-center text-gray-600 mb-6 text-sm">
          Please share your details to get in touch.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your name*"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Your email*"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
            value={formData.phone}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your message*"
            rows="4"
            className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-md font-medium hover:bg-orange-600 transition-all duration-200 shadow-md"
          >
            Submit
          </button>
        </form>

        {status && (
         <p className="text-center text-sm mt-4 font-medium text-gray-700">
              {status}
        </p>
        )}

        
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            <span className="text-orange-500 font-medium">
              aryan17chauhan@gmail.com
            </span>{" "}
            | +91 98736 84567
          </p>
        </div>
      </div>
    </div>
  );
}