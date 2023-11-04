
import Heading from "../Heading";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";

export default function Settings() {
    return (
      <div className="ml-[50px] md:ml-[70px]">
        <h1 className="mb-8 text-3xl font-medium text-richblack-5">
          <Heading children={"Settings"}/>
        </h1>
        {/* Change Profile Picture */}
        <ChangeProfilePicture/>
        {/* Profile */}
        <EditProfile/>
        {/* Password */}
        
        {/* Delete Account */}

      </div>
    )
  }