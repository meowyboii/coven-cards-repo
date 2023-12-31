import { useState, useEffect } from "react";
import { AdminMenu } from "./AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { CategoryForm } from "./CategoryForm";
import { Modal } from "antd";
import { Layout } from "../../components/LayoutAdmin";
import { motion } from 'framer-motion';

export const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while retrieving the categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        { name }
      );
      if (data?.success) {
        getAllCategory();
        toast.success(`${name} is Created`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in the input form");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is Updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`
      );
      if (data?.success) {
        toast.success(data?.message);
        getAllCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex justify-center text-[#343434] font-main bg-gradient-to-b from-[#E9DDEE] to-[#D4C1DB]">
        <AdminMenu />
        <div className="container mx-auto mt-2 ml-20 h-[100vh] py-[10vh]">
        <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        transition={{ duration: 1 }}
        >
          <div className="w-1/3 mb-10 ml-20">
            <h2 className="text-3xl mb-4 ">Manage Categories</h2>
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
              buttonName="Add Category"
            />
          </div>

          <table className="table-auto font-main border-collapse w-1/2 ml-20">
            <thead>
              <tr>
                <th className="border-b border-gray-400 px-4 py-2 text-justify">
                  Category
                </th>
                <th className="border-b border-gray-400 px-4 py-2 text-justify">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <>
                  <tr>
                    <td
                      className="border-b border-gray-400 px-4 py-2"
                      key={c.id}
                    >
                      {c.name}
                    </td>
                    <td className="border-b border-gray-400 px-4 py-2">
                      <button
                        className="px-4 py-2 bg-purple text-white rounded hover:bg-purpler my-2 mx-2"
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(c.name);
                          setSelected(c);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-2 bg-purple text-white rounded hover:bg-purpler my-2 mx-2"
                        onClick={() => {
                          handleDelete(c._id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <h2 className="text-2xl font-bold mb-4 ">Edit Category</h2>
            <CategoryForm
              handleSubmit={handleUpdate}
              value={updatedName}
              setValue={setUpdatedName}
              buttonName="Update Category"
            />
          </Modal>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};
