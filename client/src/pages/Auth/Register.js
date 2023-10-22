import React,{useState} from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import { Select } from "antd";
const { Option } = Select;
const Register = () => {
    const[name,setName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[phone,setPhone] = useState("");
    const[address,setAddress] = useState("");
    const [governorate, setGovernorate] = useState("");
    const [apartement, setApartement] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [lname, setLName] = useState("");

    const navigate = useNavigate();

    const handleSubmit= async(e) =>{
        e.preventDefault();
        try{
            const res= await axios.post('http://localhost:8080/api/v1/auth/register',{name,lname,email,password,phone,address,apartement,governorate,postalCode,city});
            toast.success(res.data && res.data.message);
                navigate("/login");

        } catch(error){
            console.log(error);
            toast.error('Something went wrong');
        }
    };

  return (
    <Layout title='Register'>
        <div className='form-container'>
        <h1>Register Form</h1>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    
    <input type="text" value={name} onChange={(e) =>setName(e.target.value)} className="form-control" id="exampleInputEmail1 "  placeholder='First Name' required />
  </div>
  <div className="mb-3">
  <input type="text" value={lname} onChange={(e) =>setLName(e.target.value)} className="form-control" id="exampleInputEmail1 "  placeholder='Last Name' required />
  </div>

  <div className="mb-3">
    <input type="email"value={email}onChange={(e) =>setEmail(e.target.value)}  className="form-control" id="exampleInputEmail1" placeholder='Email' required/>
  </div>
  <div className="mb-3">
    <input type="password"  value={password}onChange={(e) =>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Password' required />
  </div>

  <div className="mb-3">
    <input type="text" value={phone}onChange={(e) =>setPhone(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Phone Number' required/>
  </div>
  <div className="mb-3">
    <input type="text" value={address}onChange={(e) =>setAddress(e.target.value)}  className="form-control" id="exampleInputEmail1" placeholder='Address' required/>
  </div>
  <div className="mb-3">
  <input type="text" value={apartement} onChange={(e) =>setApartement(e.target.value)} className="form-control" id="exampleInputEmail1 "  placeholder='Apartment, suite, etc. (optional)'  />
  </div>
  <div className="mb-3">
  <input type="text" value={city} onChange={(e) =>setCity(e.target.value)} className="form-control" id="exampleInputEmail1 "  placeholder='City' required />
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
  <input type="text" value={postalCode} onChange={(e) =>setPostalCode(e.target.value)} className="form-control" id="exampleInputEmail1 "  placeholder='Postal code' required />
  </div>
  <button type="Register" className="btn btn-primary">Register</button>
</form>



        </div>
    </Layout>
  );
};

export default Register;