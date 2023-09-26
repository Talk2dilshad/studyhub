import React, { useState } from 'react';
import { sidebarLinks } from '../../data/dashboard-links';
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../services/operations/authAPI';
import Model from '../common/Model';
import { VscSignOut } from 'react-icons/vsc';

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  console.log("sidebar called ", user);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal, setConfirmationModal] = useState(null);

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 left-0 mr-4 h-full w-[50px] md:min-w-[220px] flex flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10 overflow-y-auto">
      {/* The "overflow-y-auto" class makes the sidebar content scrollable */}
      <div className="flex flex-col">
        {sidebarLinks.map((link) => {
          if (link.type && user?.accountType !== link.type) return null;
          return <SidebarLink key={link.id} link={link} iconName={link.icon} />;
        })}
      </div>
      <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
      <div className="flex flex-col">
        <SidebarLink
          link={{ name: "Settings", path: "/dashboard/settings" }}
          iconName="VscSettingsGear"
        />
        <button
          onClick={() =>
            setConfirmationModal({
              text1: "Are you sure?",
              text2: "You will be logged out of your account.",
              btn1Text: "Logout",
              btn2Text: "Cancel",
              btn1Handler: () => dispatch(logout(navigate)),
              btn2Handler: () => setConfirmationModal(null),
            })
          }
          className="px-3 md:px-8 py-2 text-sm font-medium text-richblack-300"
        >
          <div className="flex items-center gap-x-2">
            <VscSignOut className="text-lg" />
            <span className="hidden md:block">Logout</span>
          </div>
        </button>
        
      </div>
      {confirmationModal && <Model modalData={confirmationModal} />}
    </div>
  );
};

export default Sidebar;