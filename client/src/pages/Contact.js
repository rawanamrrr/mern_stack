import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport,BiLogoInstagram } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/advertise-intro-connect@2x.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            FOR ANY QUESTION ABOUT OUR PRODUCTS FEEL FREE TO CONTACT US
          </p>
          <p className="mt-3">
            <BiLogoInstagram /> : zera.eg

          </p>
          <p className="mt-3">
            <BiMailSend /> : www.Zeraeg@gmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 01024285771

          </p>
          <p className="mt-3">
            <BiLogoInstagram /> : zera.eg

          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;