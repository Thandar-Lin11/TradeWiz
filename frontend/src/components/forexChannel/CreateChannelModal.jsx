import { useState } from "react";
import useCreateChannel from "../../hooks/useCreateChannel";

const CreateChannelModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { createChannel } = useCreateChannel();
  // const [members, setMembers] = useState([]);

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    try {
      // const channelData = { name, description, members };
      const newChannel = await createChannel(name);
      console.log("Channel created:", newChannel);
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Error creating channel:", error.message);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="font-bold text-lg mb-4">Create a New Channel</h3>
            <form onSubmit={handleCreateChannel}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Channel Name</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter channel name"
                  className="input input-bordered w-full text-black"
                  required
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                  className="input input-bordered w-full text-black"
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Create Channel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateChannelModal;
