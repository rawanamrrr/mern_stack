import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Exchange Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/sorry-no-refund-exchange-only-sign-s2-5026.png"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>No Refund,Exchange only.</p>
          <p>All exchanges must be done within a maximum of two days of receiving your product.</p>
          <p>Reach out to us via DM or email incase you decided to exchange.</p>
          <p>Exchanged items must be returned new, unused, unwashed and with all garment tags attached otherwise we won’t be able to exchange the product.</p>
          <p>The customer pays for the shipping fees of the item returning back to us.</p>
          
        </div>
      </div>
    </Layout>
  );
};

export default Policy;