"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Picker from "emoji-picker-react";

const Inbox: React.FC = () => {
  // Emoji Picker State
  const [showPicker, setShowPicker] = useState(false);

  // Form Validation Schema
  const formSchema = Yup.object().shape({
    message: Yup.string().required("Message is required"),
  });

  // Initial Form Values
  const initValues = {
    message: "",
  };

  // Formik Setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initValues,
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/forum_messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res) => {
        if (res.ok) {
          res.json().then((newMessage) => {
            console.log("Message sent:", newMessage);
            formik.resetForm();
          });
        } else {
          res.json().then((error) => console.error(error.message));
        }
      });
    },
  });

  // Emoji Selection Handler
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onEmojiClick = (emojiObject: any) => {
    const newMessage = formik.values.message + emojiObject.emoji;
    formik.setFieldValue("message", newMessage);
    setShowPicker(false);
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Left Section */}
      <div className="w-1/3 border-r border-gray-800">
        <div className="text-2xl font-extrabold text-start p-4">Messages</div>
        <div className="flex flex-col w-full justify-evenly items-center mt-16">
          <h1 className="text-3xl font-bold">Welcome to your inbox!</h1>
          <p className="mt-2 text-gray-400 text-center">
            Drop a line, share posts and more with private conversations between
            you and others.
          </p>
          <div className="text-start">
            <button className="mt-6 bg-blue-500 text-white text-lg font-bold px-8 py-4 rounded-full hover:bg-blue-600">
              Write a message
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex flex-col items-center justify-center">
        <h2 className="text-3xl font-extrabold">Select a message</h2>
        <p className="mt-2 text-gray-400 text-start pl-12">
          Choose from your existing conversations, start a <br /> new one, or
          just keep swimming.
        </p>
        <button className="mt-6 bg-blue-500 text-white text-lg font-bold px-8 py-4 rounded-full hover:bg-blue-600">
          New message
        </button>

        {/* Form Section */}
        <div className="w-[500px] mt-6">
          <form className="ui form" onSubmit={formik.handleSubmit}>
            <div className="field mb-4">
              {/* Input Field */}
              <div className="relative flex items-center border rounded-md p-2">
                <input
                  type="text"
                  name="message"
                  id="message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  placeholder="Message..."
                  className="w-full bg-black text-white p-2 outline-none"
                />
                {/* Emoji Picker Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPicker(!showPicker)}
                  className="ml-2 bg-gray-700 p-2 rounded-md text-white hover:bg-gray-600"
                >
                  😊
                </button>
              </div>
              {/* Error Message */}
              {formik.errors.message && (
                <p style={{ color: "red", textAlign: "left", marginTop: 4 }}>
                  {formik.errors.message}
                </p>
              )}
            </div>

            {/* Emoji Picker */}
            {showPicker && (
              <div className="absolute z-10">
                <Picker
                  onEmojiClick={onEmojiClick}
                  reactionsDefaultOpen={true}
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white text-lg font-bold px-8 py-4 rounded-full hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
