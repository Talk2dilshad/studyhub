import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formattedDate } from '../../utils/formattedDate';
import IconBtn from '../common/IconBtn';
import { RiEditBoxLine } from 'react-icons/ri';

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  // Destructure profile properties from the user object
  const { firstname, lastname, email, profile } = user;
  const { gender, dob, about, contactNumber } = profile || {};
  console.log("profile destrcuture ",gender,dob,about,contactNumber)

  return (
    <div className="flex-grow ml-[50px] md:ml-[220px]">
      <h1 className="mb-8 text-3xl font-medium text-richblack-5">My Profile</h1>
      <div className="flex items-center justify-between rounded-xl bg-richblack-800 py-6 px-4 md:p-8 md:px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.profile_pic}
            alt={`profile-${firstname}`}
            className="aspect-square w-[48px] md:w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {firstname + ' ' + lastname}
            </p>
            <p className="text-sm text-richblack-300">{email}</p>
          </div>
        </div>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-xl bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate('/dashboard/settings');
            }}
            className="hidden md:block"
            customClasses={"bg-blue-50 "}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            about ? 'text-richblack-5' : 'text-richblack-400'
          } text-sm font-medium`}
        >
          {about || 'Write Something About Yourself'}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-xl bg-richblack-800 p-8 px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate('/dashboard/settings');
            }}
            className="hidden md:block"
            customClasses={"bg-blue-50 "}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex flex-col md:flex-row max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">{firstname}</p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">{email}</p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {gender || 'Add Gender'}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">{lastname}</p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {contactNumber || 'Add Contact Number'}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(dob) || 'Add Date Of Birth'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
