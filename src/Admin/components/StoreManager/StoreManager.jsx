import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const StoreManager = () => {

    const storeData = {
        "about": "we are library",
        "contact": {
            "email": "qsssssssssssssss",
            "whatsapp1": "0608019095",
            "whatsapp2": "0608019095",
            "telegram1": "0608019095",
            "telegram2": "0608019095",
            "phone1": "0608019095",
            "phone2": "0608019095"
        },
        "location": "fes adarissa",
        "logo": null,
        "social_links": {
            "facebook": "https://www.facebook.com/",
            "instagram": "https://www.instagram.com/",
            "twitter_x": "https://www.x.com/"
        },
        "store_name": "ecowebsite",
        "store_slang": "eco",
        "created_at": "2024-12-20T21:10:15.000000Z",
        "updated_at": "2024-12-20T23:58:10.000000Z",
        "working_hours": {
            "monday": { "start": "02: 57", "close": "12: 28" },
            "tuesday": { "start": "00: 28", "close": "12: 28" },
            "wednesday": { "start": "00: 59", "close": "00: 58" },
            "thursday": { "start": "00:00", "close": "00:00" },
            "friday": { "start": "00: 59", "close": "01: 57" },
            "saturday": { "start": null, "close": "01: 57" },
            "sunday": { "start": "00:00", "close": "12: 57" }
        }
    }

    const parsedSocialLinks = storeData?.social_links;
    // ? JSON.parse(storeData.social_links) : {};
    const parsedContact = storeData?.contact;
    // ? JSON.parse(storeData.contact) : {};
    const parsedWorkingHours = storeData?.working_hours;
    //  ? JSON.parse(storeData.working_hours) : {};

    console.log(parsedWorkingHours);

    const [formData, setFormData] = useState({
        store_name: storeData?.store_name || "",
        store_slang: storeData?.store_slang || "",
        logo: "",
        social_links: {
            facebook: parsedSocialLinks?.facebook || "",
            instagram: parsedSocialLinks?.instagram || "",
            twitter_x: parsedSocialLinks?.twitter_x || ""
        },
        contact: {
            email: parsedContact?.email || "",
            whatsapp1: parsedContact?.whatsapp1 || "",
            whatsapp2: parsedContact?.whatsapp2 || "",
            telegram1: parsedContact?.telegram1 || "",
            telegram2: parsedContact?.telegram2 || "",
            phone1: parsedContact?.phone1 || "",
            phone2: parsedContact?.phone2 || ""
        },
        working_hours: {
            monday: { start: parsedWorkingHours?.monday?.start || "", close: parsedWorkingHours?.monday?.close || "" },
            tuesday: { start: parsedWorkingHours?.tuesday?.start || "", close: parsedWorkingHours?.tuesday?.close || "" },
            wednesday: { start: parsedWorkingHours?.wednesday?.start || "", close: parsedWorkingHours?.wednesday?.close || "" },
            thursday: { start: parsedWorkingHours?.thursday?.start || "", close: parsedWorkingHours?.thursday?.close || "" },
            friday: { start: parsedWorkingHours?.friday?.start || "", close: parsedWorkingHours?.friday?.close || "" },
            saturday: { start: parsedWorkingHours?.saturday?.start || "", close: parsedWorkingHours?.saturday?.close || "" },
            sunday: { start: parsedWorkingHours?.sunday?.start || "", close: parsedWorkingHours?.sunday?.close || "" },
        },
        location: storeData?.location || "",
        about: storeData?.about || "",
    });


    const fetchStores = async () => {
        try {
            await axios.get("/storemanager");
        } catch (error) {
            console.error("Error fetching stores:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split(".");

        // Handle nested properties (like working_hours.day.start or working_hours.day.close)
        if (keys.length === 3) {
            const day = keys[1];
            const timeType = keys[2]; // 'start' or 'close'

            setFormData((prevState) => ({
                ...prevState,
                working_hours: {
                    ...prevState.working_hours,
                    [day]: {
                        ...prevState.working_hours[day],
                        [timeType]: value, // Update either 'start' or 'close'
                    },
                },
            }));
        }
        // Handle other nested properties (like general object with nested fields)
        else if (keys.length > 1) {
            setFormData((prevState) => ({
                ...prevState,
                [keys[0]]: {
                    ...prevState[keys[0]],
                    [keys[1]]: value,
                },
            }));
        }
        // Handle simple properties (e.g., direct formData fields)
        else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Always update the store, regardless of existing data
            const response = await axios.patch(route('storemanager.update'), { ...formData });

            if (response.data?.message) {
                toast.success(response.data.message); // Adjust according to your response structure
            } else {
                toast.error("An unexpected error occurred.");
            }

            fetchStores();
        } catch (error) {
            console.error("Error saving store:", error);
        }
    };

    useEffect(() => {
        fetchStores();
    }, []);

    return (
        <main className="max-width-wh-100 w-100 main-content max-height-vh-100 h-100 border-radius-lg">
            <div className="row d-flex justify-content-center mt-2">
                <div className="p-6 bg-gray-100 min-h-screen">
                    <h1 className="text-3xl font-bold mb-3 text-center">Store Manager</h1>
                    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            {/* Basic Fields */}
                            <div className="flex flex-col sm:flex-row sm:space-x-4 max-w-full">
                                <div className="mb-4 w-full sm:w-1/2">
                                    <label className="block text-gray-700 font-medium mb-2">Store Name</label>
                                    <input
                                        type="text"
                                        name="store_name"
                                        value={formData.store_name}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                                <div className="mb-4 w-full sm:w-1/2">
                                    <label className="block text-gray-700 font-medium mb-2">Store Slang</label>
                                    <input
                                        type="text"
                                        name="store_slang"
                                        value={formData.store_slang}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                            </div>

                            {/* Social Links */}
                            {["facebook", "instagram", "twitter_x"].map((platform) => (
                                <div key={platform} className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2">
                                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                                    </label>
                                    <input
                                        type="text"
                                        name={`social_links.${platform}`}
                                        value={formData.social_links[platform]}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                    />
                                </div>
                            ))}

                            {/* Contact */}
                            <div>
                                {["email"].map((contactinfo) => (
                                    <div key={contactinfo} className="mb-4">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            {contactinfo.charAt(0).toUpperCase() + contactinfo.slice(1)}
                                        </label>
                                        <input
                                            type="text"
                                            name={`contact.${contactinfo}`}
                                            value={formData.contact[contactinfo]}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                ))}

                                <div className="flex flex-col sm:flex-row sm:space-x-4 max-w-full">
                                    {["whatsapp1", "whatsapp2"].map((contactinfo) => (
                                        <div className=" w-full sm:w-1/2">
                                            <div key={contactinfo} className="mb-4">
                                                <label className="block text-gray-700 font-medium mb-2">
                                                    {contactinfo.charAt(0).toUpperCase() + contactinfo.slice(1)}
                                                </label>
                                                <input
                                                    type="text"
                                                    name={`contact.${contactinfo}`}
                                                    value={formData.contact[contactinfo]}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row sm:space-x-4 max-w-full">
                                    {["telegram1", "telegram2"].map((contactinfo) => (
                                        <div className="w-full sm:w-1/2">
                                            <div key={contactinfo} className="mb-4">
                                                <label className="block text-gray-700 font-medium mb-2">
                                                    {contactinfo.charAt(0).toUpperCase() + contactinfo.slice(1)}
                                                </label>
                                                <input
                                                    type="text"
                                                    name={`contact.${contactinfo}`}
                                                    value={formData.contact[contactinfo]}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col sm:flex-row sm:space-x-4 max-w-full">
                                    {["phone1", "phone2"].map((contactinfo) => (
                                        <div className=" w-full sm:w-1/2">
                                            <div key={contactinfo} className="mb-4">
                                                <label className="block text-gray-700 font-medium mb-2">
                                                    {contactinfo.charAt(0).toUpperCase() + contactinfo.slice(1)}
                                                </label>
                                                <input
                                                    type="text"
                                                    name={`contact.${contactinfo}`}
                                                    value={formData.contact[contactinfo]}
                                                    onChange={handleInputChange}
                                                    className="w-full p-2 border border-gray-300 rounded"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Working Hours */}
                            {Object.keys(formData.working_hours).map((day) => (
                                <div key={day} className="mb-4">
                                    <label className="block text-gray-700 font-medium mb-2 capitalize">
                                        {day} Hours [Open at - Close at]
                                    </label>
                                    <div className="flex space-x-4">
                                        <input
                                            type="time"
                                            name={`working_hours.${day}.start`}
                                            value={formData.working_hours[day].start}
                                            onChange={handleInputChange}
                                            className="w-1/2 p-2 border border-gray-300 rounded"
                                        />

                                        <input
                                            type="time"
                                            name={`working_hours.${day}.close`}
                                            value={formData.working_hours[day].close}
                                            onChange={handleInputChange}
                                            className="w-1/2 p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                </div>
                            ))}

                            {/* Location */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>

                            {/* About */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">About</label>
                                <textarea
                                    name="about"
                                    value={formData.about}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            </div>

                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default StoreManager;
