import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PinData } from "../context/PinContext";
import { Loading } from "../components/LoadingAnimation";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

const PinPage = ({ user }) => {
  const params = useParams();
  const {
    loading,
    fetchPin,
    pin,
    updatePin,
    addComment,
    deleteComment,
    deletePin,
  } = PinData();

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [pinValue, setPinValue] = useState("");
  const [comment, setComment] = useState("");

  // it's for editing the input or title/pin
  const editHandler = () => {
    setTitle(pin.title);
    setPinValue(pin.pin);
    setEdit(!edit);
  };

  // it's for updating the title,pin
  const updateHandler = () => {
    updatePin(pin._id, title, pinValue, setEdit);
  };

  // it's for adding comment
  const submitHandler = (e) => {
    e.preventDefault();
    addComment(pin._id, comment, setComment);
  };

  // it's for deleting the comment
  const deleteCommentHandler = (id) => {
    if (confirm("Are you sure to delete this comment"))
      deleteComment(pin._id, id);
  };

  const navigate = useNavigate();

  const deletePinHandler = () => {
    if (confirm("Are you sure to delet this pin ?"))
      deletePin(pin._id, navigate);
  };

  useEffect(() => {
    fetchPin(params.id);
  }, [params.id]);

  return (
    <div>
      {" "}
      {/* this is checking if pins are avilable then rest of code will be executed */}
      {pin && (
        <div className="flex flex-col mt-5 p-10 items-center bg-gray-100 min-h-screen">
          {loading ? (
            <Loading />
          ) : (
            <div className="bg-white rounded-lg shadow-lg flex flex-wrap w-full max-w-4xl">
              <div className="w-full md:w-1/2 bg-gray-200 rounded-t-lg md:rounded-lg md:rounded-t-none flex        items-center justify-center">
                {pin.image && (
                  <img
                    src={pin.image.url}
                    className="object-cover w-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                  />
                )}
              </div>
              <div className="w-full md:w-1/2 p-6 flex flex-col  ">
                <div className="flex items-center justify-between mb-4 ">
                  {/* here we've added a condiotional rendering if there would be editing in text then inputs will be showcasing else it'll hide the inputs */}
                  {edit ? (
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="common-input border-2 px-2 py-2"
                      style={{ width: "200px" }}
                      placeholder="Enter title"
                    />
                  ) : (
                    <h1 className="text-2xl font-bold">{pin.title}</h1>
                  )}
                  {pin.owner && pin.owner._id === user._id && (
                    <button onClick={editHandler}>
                      <FaRegEdit />
                    </button>
                  )}
                  {/* only pin owner can delete the pin whoever has created it. */}
                  {pin.owner && String(pin.owner._id) === String(user._id) && (
                    <button
                      onClick={deletePinHandler}
                      className="bg-red-500 text-white py-1 px-3 rounded ml-4"
                    >
                      <MdDelete />
                    </button>
                  )}
                </div>

                {/* it is for title/pin section */}
                {edit ? (
                  <input
                    value={pinValue}
                    onChange={(e) => setPinValue(e.target.value)}
                    className="common-input border-2 px-2 py-2"
                    style={{ width: "200px" }}
                    placeholder="Enter Description"
                  />
                ) : (
                  <p className="mb-6">{pin.pin}</p>
                )}

                {/* here we can again update our title/pin */}
                {edit && (
                  <button
                    style={{ width: "200px" }}
                    onClick={updateHandler}
                    className="bg-red-500 text-white py-1 px-3 mt-4 mb-3"
                  >
                    Update
                  </button>
                )}

                {pin.owner && (
                  <div className="flex items-center justify-between border-b pb-4 mb-4">
                    <div className="flex items-center">
                      <Link to={`/user/${pin.owner._id}`}>
                        <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center">
                          <span className="font-bold">
                            {pin.owner.name.slice(0, 1)}{" "}
                            {/* this will show the first letter of user name */}
                          </span>
                        </div>
                      </Link>
                      <div className="ml-4">
                        <h2 className="text-lg font-semibold">
                          {pin.owner.name} {/* this will show the user name */}
                        </h2>
                        <p className="text-gray-500 ">
                          {pin.owner.followers.length} Followers
                          {/* this will show user followers */}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {/* this section for comment input adding and updating it */}
                <div className="flex items-center mt-4">
                  <div className="rounded-full h-12 w-12 bg-gray-300 flex  items-center justify-center mr-4">
                    <span className="font-bold ">
                      {pin.owner && pin.owner.name.slice(0, 1)}
                    </span>
                  </div>
                  <form className="flex flex-1  " onSubmit={submitHandler}>
                    <input
                      type="text"
                      className="flex-1 border rounded-lg p-2"
                      placeholder="Enter comment"
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="ml-2 bg-red-500 px-4 py-2 rounded-md text-white"
                    >
                      Add+
                    </button>
                  </form>
                </div>

                {/* here we are adding the comment  */}
                <hr className="font-bold text-gray-400 mt-3 mb-3" />
                <div className="scrollBar overflow-y-auto h-64 flex  flex-col items-start justify-between ">
                  {pin.comments && pin.comments.length > 0 ? (
                    pin.comments.map((e, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-center mb-4"
                      >
                        <div className="flex items-center justify-center gap-8 mb-4">
                          <Link to={`/user/${e.user}`}>
                            <div className="rounded-full h-12 w-12 bg-gray-300 flex items-center justify-center">
                              <span className="font-bold">
                                {e.name.slice(0, 1)}
                                {/* this will show the first letter of user name */}
                              </span>
                            </div>
                          </Link>
                          <div className="ml-4">
                            <div className="ml-4">
                              <h2 className="text-lg font-semibold">
                                {e.name} {/* this will show the user name */}
                              </h2>
                              <p className="text-gray-500">{e.comment}</p>
                            </div>
                          </div>
                          {e.user === user._id && (
                            <button
                              onClick={() => deleteCommentHandler(e._id)}
                              className="bg-red-500 text-white py-1 px-3 rounded"
                            >
                              {" "}
                              <MdDelete />{" "}
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Be the first one to add comment</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PinPage;
