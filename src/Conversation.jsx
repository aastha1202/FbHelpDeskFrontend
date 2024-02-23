import axios from "axios";
import { useEffect, useState } from "react";
import { SiRedux } from "react-icons/si";
import { FaInbox } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { HiMiniChartBar } from "react-icons/hi2";
import { IoIosRefresh } from "react-icons/io";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";

const Conversation = () => {
  const [users, setUsers] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [selected, setSelected] = useState({});
  const [loggedInUser, setLoggedInUser] = useState();
  const [recipientId, setRecipientId] = useState();
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [userMessage, setUserMessage] = useState([]);
  const [postMessage, IsPostMessage] = useState(false)

  const handleSelection = (index, data) => {
    setSelected(index);
    setSelectedUser(data.senders.data[0].name);
    setRecipientId(data.senders.data[0].id);
    setUserMessage(data.messages.data.reverse());
    console.log(selectedUser);
  };
  const sidebarMenu = [
    { icon: <SiRedux />, label: "Redux" },
    { icon: <FaInbox />, label: "Inbox" },
    { icon: <IoPerson />, label: "Person" },
    { icon: <HiMiniChartBar />, label: "MiniChartBar" },
  ];

  useEffect(() => {
    const pageAccessToken = localStorage.getItem("pageAccessToken");
    axios
      .post("https://fbhelpdesk-server.onrender.com/get-page-messages", { pageAccessToken })
      .then((res) => {
        console.log(res.data.data.data);
        setUsers(res.data.data);
      })
      .catch((error) => console.error(error));

    function getLoggedInUser() {
      axios
        .get(
          `https://graph.facebook.com/v19.0/me/?access_token=${pageAccessToken}`
        )
        .then((res) => setLoggedInUser(res.data.id))
        .catch((err) => console.log(err));
    }
    getLoggedInUser();
  }, [postMessage]);

  const handleMenuItemClick = (index) => {
    setSelectedMenuItem(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const pageAccessToken = localStorage.getItem("pageAccessToken");
      console.log(pageAccessToken);
      axios
        .post("https://fbhelpdesk-server.onrender.com/messages", {
          id: recipientId,
          message: newMessage,
          pageAccessToken: pageAccessToken,
        })
        .then((response) => {
          setNewMessage('')
          IsPostMessage(true)
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <div style={{ display: "flex" }}>
      <div className="sidebar">
        <div className="flex-div">
          {sidebarMenu.map((item, index) => (
            <div
              key={index}
              className={`menuItem ${
                selectedMenuItem === index ? "selected" : ""
              }`}
              onClick={() => handleMenuItemClick(index)}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>

      <div className="conversation-list">
        <div className="conversation-header">
          <HiBars3BottomLeft />
          <h3 style={{ marginRight: "20px" }}>Conversation</h3>
          <IoIosRefresh />
        </div>

        <div className="flex-div">
          {users &&
            users.map((data, index) => (
              <div
                key={data.id}
                className="user-section"
                style={{
                  backgroundColor:
                    selected === index ? "rgb(240 240 240)" : "white",
                }}
              >
                <div
                  style={{ display: "flex", gap: "10px" }}
                  onClick={() => handleSelection(index, data)}
                >
                  <input type="checkbox" />
                  <div className="flex-div flex-start">
                    <span className="userName">
                      {data.senders.data[0].name}
                    </span>
                    <span className="dmType">Facebook DM</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="center-screen">
        <div style={{ display: "flex" }}>
          <div className="flex-div message-div">
            <div className="conversation-thread">
              <div
                className="userName"
                style={{
                  backgroundColor: "white",
                  padding: "1em",
                  textAlign: "left",
                }}
              >
                {selectedUser}
              </div>
              {userMessage.map((text, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection:
                      text.from.id === loggedInUser ? "row-reverse" : "row",
                    marginTop: "20px",
                    marginLeft: "10px",
                  }}
                >
                  <CgProfile size={30} />
                  <div className="flex-div flex-start message-box">
                    <div className="message">{text.message}</div>
                    <span className="message-from">{text.from.name}</span>
                  </div>
                </div>
              ))}
            </div>
            <input
              placeholder="Type your message here"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
          </div>

          {selectedUser!== null && <div style={{ flex: 1 }}>
            <div className="profile-upper-div">
              <CgProfile size={40} />
              <div>{selectedUser}</div>
            </div>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
