import axios from "axios";
import arrowIcon from "../assets/right-arrow.svg";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useState } from "react";

const airtableBaseUrl = process.env.VITE_AIRTABLE_BASE_HACKATHON_REGISTER_URL;
const accessToken = process.env.VITE_AIRTABLE_ACCESS_TOKEN;

const HackathonRegistrationForm = ({ togglePopup, setShowSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    companyCollege: ''
  });

  const [notification, setNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveUserData = async (name, email, phoneNumber, companyCollege, currentTimestamp, formattedTimestamp) => {
    try {
      const response = await axios.post(
        airtableBaseUrl,
        {
          fields: {
            Name: name,
            "Mobile Number": phoneNumber, // Make sure this matches exactly
            "Email Id": email, // Make sure this matches exactly
            "Unique Id": currentTimestamp.toString(),
            "Company/College": companyCollege,
            Timestamp: formattedTimestamp,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Use the personal access token here
            "Content-Type": "application/json",
          },
        }
      );

      setShowSuccess(true);

    } catch (error) {
      setNotification({
        type: "error",
        title: "Error",
        description: "Error in saving you data in air table",
      });

      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);

      console.error("Error saving data:", error);

      return;
    }
  };

  const handleSubmit = async () => {

    if (formData.name === "" || !formData.phoneNumber === '' || formData.email === "") {
      setNotification({
        type: "error",
        title: "Error",
        description: "Fill in all details",
      });
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      return;
    }

    setLoading(true);
    const currentTimestamp = Date.now();
    const formattedTimestamp = new Date().toLocaleString(); // e.g., "10/7/2024, 12:34:56 PM"
    const res = await saveUserData(formData.name, formData.email, formData.phoneNumber, formData.companyCollege, currentTimestamp, formattedTimestamp);
    setLoading(false);

    console.log("data saved");

    togglePopup();

    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };


// Update form data on change

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

return (
  <div className="mx-4 md:mx-0 pt-10 px-8 lg:px-12 pb-12 bg-white rounded-xl">
    <div className="flex justify-end">
      <button onClick={togglePopup}>✖</button>
    </div>

    <div className="flex flex-col gap-8">
      <div className="text-[#120D26] font-semibold text-[22px] md:text-[24px] font-inter">
        <h2>Fill the form to Register</h2>
      </div>

      <div className="flex flex-col gap-8">
        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 text-[12px] text-[#525966]">
            Name*
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder=""
            className="border border-[#C1C1C1] rounded-md px-3 py-2 w-full outline-none"
          />
        </div>

        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 text-[12px] text-[#525966]">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=""
            className="border border-[#C1C1C1] rounded-md px-3 py-2 w-full outline-none"
          />
        </div>

          <div className="relative">
            <label className="absolute -top-2 left-3 bg-white px-1 text-[12px] text-[#525966]">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder=""
              className="border border-[#C1C1C1] rounded-md px-3 py-2 w-full outline-none"
            />
          </div>

        <div className="relative">
          <label className="absolute -top-2 left-3 bg-white px-1 text-[12px] text-[#525966]">
            Company/College
          </label>
          <input
            type="text"
            name="companyCollege"
            value={formData.companyCollege}
            onChange={handleChange}
            placeholder=""
            className="border border-[#C1C1C1] rounded-md px-3 py-2 w-full outline-none"
          />
        </div>

        <div>
          <button
            onClick={handleSubmit}
            className="flex w-full gap-3 p-3 rounded-xl justify-center items-center bg-[#24304C] text-white"
          >
            <p className="text-[18px] md:text-[20px] font-medium">{loading ? "Loading..." : "Register Now"}</p>
            <img src={arrowIcon} alt="icon" />
          </button>
        </div>
      </div>
    </div>

    {/* Notification Section */}
    {notification && (
              <div
                className={`fixed left-1/2 transform -translate-x-1/2 ${
                  showNotification
                    ? "bottom-4 opacity-100"
                    : "-bottom-20 opacity-0"
                } transition-all duration-500 ease-in-out z-50 max-w-[340px] md:max-w-[400px] w-full`}
              >
                <div
                  className={`flex items-center justify-between gap-3 p-4 rounded-lg shadow-lg ${
                    notification.type === "success"
                      ? "bg-gradient-to-r from-green-400 to-green-600"
                      : "bg-gradient-to-r from-red-400 to-red-600"
                  } text-white`}
                >
                  {/* Icon */}
                  <div className="text-2xl">
                    {notification.type === "success" ? (
                      <FaCheckCircle />
                    ) : (
                      <FaExclamationCircle />
                    )}
                  </div>

                  {/* Notification Content */}
                  <div className="flex flex-col">
                    <span className="font-bold text-lg">{notification.title}</span>
                    <span className="text-sm">{notification.description}</span>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setShowNotification(false)}
                    className="text-xl font-bold"
                  >
                    ×
                  </button>
                </div>
              </div>
    )}
  </div>
);
};

export default HackathonRegistrationForm;
