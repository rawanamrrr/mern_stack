import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;
const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  const[name,setName] = useState("");
  const[password,setPassword] = useState("");
  const[email,setEmail] = useState("");
  const[phone,setPhone] = useState("");
  const[address,setAddress] = useState("");
  const [governorate, setGovernorate] = useState("");
  const [apartement, setApartement] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [lname, setLName] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, address ,governorate,city,lname,postalCode,apartement} = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
    setGovernorate(governorate);
    setApartement(apartement);
    setPostalCode(postalCode);
    setCity(city);
    setLName(lname);

  }, [auth?.user]);

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put("http://localhost:8080/api/v1/auth/profile", {
        name,
        email,
        password,
        phone,
        address,
        apartement,
        city,
        lname,
        governorate,
        postalCode,

      });
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="form-container" style={{ marginTop: "-40px" }}>
              <form onSubmit={handleSubmit}>
                <h4 className="title">USER PROFILE</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="First Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={lname}
                    onChange={(e) => setLName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Last Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Email "
                    
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password-6 Characters Long"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Phone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Address"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={apartement}
                    onChange={(e) => setApartement(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Apartment, suite, etc. (optional)"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="City"
                  />
                </div>
                <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Governorate "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setGovernorate(value);
                  }}
                >
                 <Option value="6th of October">6th of October</Option>
                  <Option value="Al Sharqia">Al Sharqia</Option>
                  <Option value="Alexandria">Alexandria</Option>
                  <Option value="Aswan">Aswan</Option>
                  <Option value="Asyut">Asyut</Option>
                  <Option value="Beheira">Beheira</Option>
                  <Option value="Beni Suef">Beni Suef</Option>
                  <Option value="Cairo">Cairo</Option>
                  <Option value="Dakahlia">Dakahlia</Option>
                  <Option value="Damietta">Damietta</Option>
                  <Option value="Faiyum">Faiyum</Option>
                  <Option value="Gharbia">Gharbia</Option>
                  <Option value="Giza">Giza</Option>
                  <Option value="Helwan">Helwan</Option>
                  <Option value="Ismailia">Ismailia</Option>
                  <Option value="Kafr-el-Sheikh">Kafr-el-Sheikh</Option>
                  <Option value="Luxor">Luxor</Option>
                  <Option value="Matrouh">Matrouh</Option>
                  <Option value="Minya">Minya</Option>
                  <Option value="Monufia">Monufia</Option>
                  <Option value="New Valley">New Valley</Option>
                  <Option value="North Sinai">North Sinai</Option>
                  <Option value="Port Said">Port Said</Option>
                  <Option value="Qalyubia">Qalyubia</Option>
                  <Option value="Qena">Qena</Option>
                  <Option value="Red Sea">Red Sea</Option>
                  <Option value="Sohag">Sohag</Option>
                  <Option value="South Sinai">South Sinai</Option>
                  <Option value="Suez">Suez</Option>

                  

                </Select>

                
              </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Postal Code"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;