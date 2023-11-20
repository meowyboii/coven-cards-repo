import React from "react";
import { AdminMenu } from "./AdminMenu";
import { Layout } from "../../components/LayoutAdmin";
import FileUpload from '../../components/FileUpload';

const UploadThing = () => {
  return (
    <Layout>
      <div className="flex justify-center text-[#343434] font-main bg-gradient-to-b from-[#E9DDEE] to-[#D4C1DB]">
        <AdminMenu />
        <div className="container mx-auto mt-2 ml-20 h-[100vh] py-[10vh]">
          <div className="w-1/3 mb-10">
            <h2 className="text-3xl mb-4">Upload Thing</h2>
            <div>
              <h1>Upload Thing Page</h1>
              <FileUpload />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UploadThing;