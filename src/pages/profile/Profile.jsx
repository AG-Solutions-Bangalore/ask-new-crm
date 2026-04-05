import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FiUser, FiMapPin, FiBriefcase, FiPhone, FiMail, FiCalendar, FiCreditCard, FiUsers, FiSave, FiArrowLeft } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { WEB_API } from "@/constants/apiConstants";
import apiClient from "@/api/apiClient";
import { Loader2 } from "lucide-react";

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const bloodOptions = [
  { value: "A +", label: "A +" },
  { value: "A -", label: "A -" },
  { value: "B +", label: "B +" },
  { value: "B -", label: "B -" },
  { value: "O +", label: "O +" },
  { value: "O -", label: "O -" },
  { value: "AB +", label: "AB +" },
  { value: "AB -", label: "AB -" },
];

const identificationOptions = [
  { value: "Aadhar Card", label: "Aadhar Card" },
  { value: "PassPort", label: "PassPort" },
  { value: "Pan Card", label: "Pan Card" },
];

const marriedOptions = [
  { value: "Yes", label: "Yes" },
  { value: "No", label: "No" },
];

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [gottras, setGotras] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiledoc, setSelectedFileDoc] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, gotraRes, stateRes] = await Promise.all([
          apiClient.get(WEB_API.fetchProfile),
          apiClient.get(WEB_API.fetchGotra),
          apiClient.get(WEB_API.fetchState),
        ]);
        setProfile(profileRes.data?.userdata);
        setGotras(gotraRes.data?.gotradata || []);
        setStates(stateRes.data?.statedata || []);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const data = new FormData();
    Object.keys(profile).forEach((key) => {
      if (profile[key] !== null && profile[key] !== undefined) {
        data.append(key, profile[key]);
      }
    });
    if (selectedFile) data.append("agrawal_images", selectedFile);
    if (selectedFiledoc) data.append("user_proof_docs", selectedFiledoc);

    try {
      const response = await apiClient.post(WEB_API.updateProfile, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data.code === 200 || response.data.code === "200") {
        toast.success("Profile Updated Successfully");
      } else {
        toast.error(response.data.msg || "Update failed");
      }
    } catch (error) {
      toast.error("Error updating profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-pink-700" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8 pb-20">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-pink-700">User Profile</h1>
          <p className="text-slate-500">Manage your member details and account information.</p>
        </div>
        <Button onClick={() => navigate(-1)} variant="outline" className="hidden md:flex gap-2">
          <FiArrowLeft /> Back
        </Button>
      </div>

      <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Summary Card */}
          <Card className="border-none shadow-md bg-white overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-pink-700 to-rose-400"></div>
            <CardContent className="-mt-16 pb-8">
              <div className="flex flex-col md:flex-row gap-6 items-end">
                <div className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img 
                    src={selectedFile ? URL.createObjectURL(selectedFile) : profile.agrawal_image ? `https://agrawalsamaj.co/crmapi/public/uploads/${profile.agrawal_image}` : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 pb-2">
                  <h2 className="text-2xl font-bold text-slate-900">{profile.name}</h2>
                  <p className="text-slate-500">{profile.email} • {profile.user_mobile_number}</p>
                </div>
                <div className="flex gap-2">
                    <Label htmlFor="profile_image" className="cursor-pointer">
                        <div className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">Change Photo</div>
                        <input id="profile_image" type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files[0])} accept="image/*" />
                    </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="border-none shadow-md">
            <CardHeader className="border-b bg-slate-50/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <FiUser className="text-pink-700" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={profile.name} onChange={onInputChange} />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <Select onValueChange={(v) => handleSelectChange("user_gender", v)} value={profile.user_gender}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {genderOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Gotra</Label>
                <Select onValueChange={(v) => handleSelectChange("gotra", v)} value={profile.gotra}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {gottras.map(o => <SelectItem key={o.gotra_name} value={o.gotra_name}>{o.gotra_name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>State</Label>
                <Select onValueChange={(v) => handleSelectChange("state", v)} value={profile.state}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {states.map(o => <SelectItem key={o.state_name} value={o.state_name}>{o.state_name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="user_mobile_number">Mobile Number</Label>
                <Input id="user_mobile_number" name="user_mobile_number" value={profile.user_mobile_number} onChange={onInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" value={profile.email} onChange={onInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user_dob">Date of Birth</Label>
                <Input id="user_dob" name="user_dob" type="date" value={profile.user_dob} onChange={onInputChange} />
              </div>
              <div className="space-y-2">
                <Label>Blood Group</Label>
                <Select onValueChange={(v) => handleSelectChange("user_blood", v)} value={profile.user_blood}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    {bloodOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Contact Details */}
          <Card className="border-none shadow-md">
            <CardHeader className="border-b bg-slate-50/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <FiMapPin className="text-pink-700" />
                Contact Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="residential_add">Residential Address</Label>
                  <Input id="residential_add" name="residential_add" value={profile.residential_add} onChange={onInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="residential_city">City</Label>
                  <Input id="residential_city" name="residential_city" value={profile.residential_city} onChange={onInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="residential_pin">Pincode</Label>
                  <Input id="residential_pin" name="residential_pin" value={profile.residential_pin} onChange={onInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="native_place">Native Place</Label>
                  <Input id="native_place" name="native_place" value={profile.native_place} onChange={onInputChange} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Marital Details */}
          <Card className="border-none shadow-md">
            <CardHeader className="border-b bg-slate-50/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <FiUsers className="text-pink-700" />
                Marital Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Marital Status</Label>
                        <Select onValueChange={(v) => handleSelectChange("married", v)} value={profile.married}>
                            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                            <SelectContent>
                                {marriedOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {profile.married === "Yes" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
                        <div className="space-y-2">
                            <Label htmlFor="spouse_name">Spouse Name</Label>
                            <Input id="spouse_name" name="spouse_name" value={profile.spouse_name} onChange={onInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="f_mannidate">Anniversary Date</Label>
                            <Input id="f_mannidate" name="f_mannidate" type="date" value={profile.f_mannidate} onChange={onInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="spouse_mobile">Spouse Mobile</Label>
                            <Input id="spouse_mobile" name="spouse_mobile" value={profile.spouse_mobile} onChange={onInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="spouse_dob">Spouse Date of Birth</Label>
                            <Input id="spouse_dob" name="spouse_dob" type="date" value={profile.spouse_dob} onChange={onInputChange} />
                        </div>
                    </div>
                )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <Card className="border-none shadow-md sticky top-24">
            <CardHeader className="border-b bg-slate-50/50 text-center">
                <CardTitle className="text-xl font-bold">Profile Actions</CardTitle>
                <CardDescription>Update your changes securely.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1 border-b">
                        <span className="text-slate-500 font-medium">Status</span>
                        <span className="text-green-600 font-bold bg-green-50 px-2 rounded">Active</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                        <span className="text-slate-500 font-medium">Member Type</span>
                        <span className="text-slate-900 font-bold capitalize">{profile.user_type || "N/A"}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b">
                        <span className="text-slate-500 font-medium">Join Date</span>
                        <span className="text-slate-900 font-bold">{profile.created_at?.split('T')[0] || "N/A"}</span>
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <Label className="text-slate-600 block mb-2">ID Proof Document</Label>
                    <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center space-y-2">
                        <FiCreditCard className="w-8 h-8 text-slate-300 mx-auto" />
                        <div className="text-xs text-slate-500">
                            {selectedFiledoc ? selectedFiledoc.name : profile.user_proof_doc ? "Document Uploaded" : "No document uploaded"}
                        </div>
                        <Label htmlFor="doc_proof" className="cursor-pointer block">
                            <div className="text-pink-700 text-sm font-bold hover:underline">Click to change</div>
                            <input id="doc_proof" type="file" className="hidden" onChange={(e) => setSelectedFileDoc(e.target.files[0])} />
                        </Label>
                    </div>
                </div>

                <Button 
                    type="submit" 
                    className="w-full h-12 bg-pink-700 hover:bg-pink-800 text-white font-bold text-lg rounded-xl shadow-lg shadow-pink-200 transition-all active:scale-95 flex items-center justify-center gap-2"
                    disabled={updating}
                >
                    {updating ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <FiSave /> Save Changes
                        </>
                    )}
                </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default Profile;
