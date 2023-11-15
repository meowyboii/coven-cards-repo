import { useState, useEffect } from "react";
import { AdminMenu } from "./AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import React from 'react';
import FileUpload from '../../components/FileUpload';
import { Modal } from "antd";
import { Layout } from "../../components/LayoutAdmin";

const UploadThing = () => {
  // Your component logic

  return (
    <Layout>
      <div className="flex justify-center text-[#343434] font-main bg-gradient-to-b from-[#E9DDEE] to-[#D4C1DB]">
        <AdminMenu />
        <div className="container mx-auto mt-2 ml-20 h-[100vh] py-[10vh]">
          <div className="w-1/3 mb-10">
            <h2 className="text-3xl mb-4 ">Manage Categories</h2>
              <div>
                <h1>Upload Thing Page</h1>
                {/* Your other component content */}
                <FileUpload />
              </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export { UploadThing }; // Named export
