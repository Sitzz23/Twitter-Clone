import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.scss";
import profilePic from "../../assets/images/default-profile-pic.png";
import MobileFooterMenu from "../../components/MobileFooterMenu/MobileFooterMenu";
import MobileHeader from "../../components/MobileHeader/MobileHeader";
import Tweet from "../../components/Tweet/Tweet";
import TweetOptions from "../../components/TweetOptions/TweetOptions";
import Overlay from "../../components/Overlay/Overlay";
import NewTweetButton from "../../components/NewTweetButton/NewTweetButton";
import ShareTweet from "../../components/ShareTweet/ShareTweet";
import DesktopMenu from "../../components/DesktopMenu/DesktopMenu";

const Home = ({
  activeUser,
  handleNewTweet,
  handleLike,
  handleUnlike,
  handleRetweet,
  handleRemoveRetweet,
  handleDeleteTweet,
  handleBookmark,
  handleRemoveBookmark,
}) => {
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [newTweetText, setNewTweetText] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [optionsDisplay, setOptionsDisplay] = useState(false);
  const [tweetOptions, setTweetOptions] = useState(null);
  const [shareDisplay, setShareDisplay] = useState(false);
  const [tweetShare, setTweetShare] = useState(null);

  useEffect(() => {
    if (activeUser) {
      axios
        .get("http://localhost:5000/api/tweets/timeline/all", {
          userId: activeUser._id,
        })
        .then((res) => setTweets(res.data))
        .catch((err) => console.log(err));
    }
  }, [activeUser]);

  useEffect(() => {
    const allUsers = [];
    tweets.forEach((tweet) => {
      axios
        .get(`http://localhost:5000/api/users/${tweet.userId}`)
        .then((res) => {
          allUsers.push(res.data);
          // Adapted from @Arun Saini https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
          const uniqueUsers = [
            ...new Map(
              allUsers.map((user) => [user["username"], user])
            ).values(),
          ];
          setUsers(uniqueUsers);
        })
        .catch((err) => console.log(err));
    });
  }, [tweets]);

  useEffect(() => {
    if (newTweetText.trim() === "" || newTweetText.trim().length > 280) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [newTweetText]);

  const handleNewTweetTextChange = (e) => {
    setNewTweetText(e.target.value);

    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleNewTweetClick = () => {
    handleNewTweet(newTweetText);
    setNewTweetText("");
  };

  const handleTweetOptionsEvent = (tweet) => {
    setTweetOptions(tweet);
    handleOptionsView();
  };

  const handleOptionsView = () => {
    setOptionsDisplay((display) => !display);
  };

  const handleShareTweetEvent = (tweet, user) => {
    setTweetShare({ tweet: tweet, user: user });
    handleShareView();
  };

  const handleShareView = () => {
    setShareDisplay((display) => !display);
  };

  const sortedTweets = tweets.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const tweetsDisplay = sortedTweets.map((tweet) => {
    const user = users.find((user) => user._id === tweet.userId);

    return (
      <Tweet
        key={tweet._id}
        tweet={tweet}
        user={user ? user : {}}
        activeUser={activeUser}
        handleLike={handleLike}
        handleUnlike={handleUnlike}
        handleRetweet={handleRetweet}
        handleRemoveRetweet={handleRemoveRetweet}
        handleTweetOptions={handleTweetOptionsEvent}
        handleShareTweet={handleShareTweetEvent}
      />
    );
  });

  return (
    <div className="home">
      <div className="home-wrapper">
        <MobileHeader page="Home" activeUser={activeUser} />
        <main className="home-main">
          <DesktopMenu activeUser={activeUser} page="Home" />
          <div className="tweets-container">
            <div className="desktop-heading-container">
              <span className="desktop-heading">Home</span>
            </div>
            <div className="desktop-new-tweet-container">
              <div className="flex-container">
                <img
                  src={profilePic}
                  alt=""
                  className="new-tweet-profile-pic"
                />
                <textarea
                  placeholder="What's happening?"
                  value={newTweetText}
                  onChange={handleNewTweetTextChange}
                />
              </div>
              <div className="desktop-new-tweet-btn-container">
                <div
                  style={{
                    width: 150,
                    height: 40,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <div style={{ width: 20, height: 40, cursor: "pointer" }}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4Z"
                          fill="#ffffff"
                        ></path>{" "}
                        <path
                          d="M4.80665 17.5211L9.1221 9.60947C9.50112 8.91461 10.4989 8.91461 10.8779 9.60947L14.0465 15.4186L15.1318 13.5194C15.5157 12.8476 16.4843 12.8476 16.8682 13.5194L19.1451 17.5039C19.526 18.1705 19.0446 19 18.2768 19H5.68454C4.92548 19 4.44317 18.1875 4.80665 17.5211Z"
                          fill="#ffffff"
                        ></path>{" "}
                        <path
                          d="M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8Z"
                          fill="#ffffff"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                  <div
                    style={{
                      width: 20,
                      height: 40,
                      marginLeft: 7,
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M17.61 21.71H6.39C5.29996 21.71 4.25456 21.277 3.48379 20.5062C2.71302 19.7354 2.28 18.69 2.28 17.6V6.38C2.28 5.28996 2.71302 4.24457 3.48379 3.4738C4.25456 2.70302 5.29996 2.27 6.39 2.27H17.61C18.7 2.27 19.7454 2.70302 20.5162 3.4738C21.287 4.24457 21.72 5.28996 21.72 6.38V17.6C21.72 18.69 21.287 19.7354 20.5162 20.5062C19.7454 21.277 18.7 21.71 17.61 21.71ZM6.39 3.77C5.69778 3.77 5.03392 4.04499 4.54445 4.53446C4.05498 5.02393 3.78 5.68779 3.78 6.38V17.6C3.78 18.2922 4.05498 18.9561 4.54445 19.4456C5.03392 19.935 5.69778 20.21 6.39 20.21H17.61C18.3022 20.21 18.9661 19.935 19.4555 19.4456C19.945 18.9561 20.22 18.2922 20.22 17.6V6.38C20.22 5.68779 19.945 5.02393 19.4555 4.53446C18.9661 4.04499 18.3022 3.77 17.61 3.77H6.39Z"
                          fill="#ffffff"
                        ></path>{" "}
                        <path
                          d="M7.86 14.9C7.09087 14.9 6.35325 14.5945 5.80939 14.0506C5.26553 13.5068 4.96 12.7691 4.96 12C4.96 11.2309 5.26553 10.4933 5.80939 9.9494C6.35325 9.40554 7.09087 9.10001 7.86 9.10001C8.05891 9.10001 8.24968 9.17902 8.39033 9.31968C8.53098 9.46033 8.61 9.65109 8.61 9.85001C8.61 10.0489 8.53098 10.2397 8.39033 10.3803C8.24968 10.521 8.05891 10.6 7.86 10.6C7.61706 10.6014 7.37866 10.6659 7.16823 10.7873C6.9578 10.9087 6.78259 11.0828 6.65981 11.2924C6.53703 11.5021 6.47091 11.74 6.46796 11.983C6.465 12.2259 6.52531 12.4654 6.64296 12.6779C6.76061 12.8905 6.93154 13.0688 7.13895 13.1953C7.34637 13.3218 7.58313 13.3921 7.82596 13.3994C8.06879 13.4066 8.30934 13.3506 8.52395 13.2367C8.73856 13.1229 8.91985 12.9551 9.05 12.75H8.59C8.39109 12.75 8.20032 12.671 8.05967 12.5303C7.91902 12.3897 7.84 12.1989 7.84 12C7.84 11.8011 7.91902 11.6103 8.05967 11.4697C8.20032 11.329 8.39109 11.25 8.59 11.25H10C10.1981 11.2526 10.3874 11.3324 10.5275 11.4725C10.6676 11.6126 10.7474 11.8019 10.75 12C10.7474 12.7666 10.4424 13.5012 9.90125 14.0442C9.36012 14.5872 8.62658 14.8947 7.86 14.9Z"
                          fill="#ffffff"
                        ></path>{" "}
                        <path
                          d="M12.65 14.89C12.5511 14.8914 12.453 14.8729 12.3614 14.8357C12.2698 14.7984 12.1866 14.7433 12.1167 14.6733C12.0468 14.6034 11.9916 14.5202 11.9544 14.4286C11.9171 14.337 11.8987 14.2389 11.9 14.14V9.84001C11.9 9.6411 11.979 9.45033 12.1197 9.30968C12.2603 9.16903 12.4511 9.09001 12.65 9.09001C12.8489 9.09001 13.0397 9.16903 13.1803 9.30968C13.321 9.45033 13.4 9.6411 13.4 9.84001V14.14C13.4 14.3389 13.321 14.5297 13.1803 14.6703C13.0397 14.811 12.8489 14.89 12.65 14.89Z"
                          fill="#ffffff"
                        ></path>{" "}
                        <path
                          d="M15.33 14.9C15.1319 14.8974 14.9426 14.8176 14.8025 14.6775C14.6624 14.5374 14.5826 14.3481 14.58 14.15V9.85001C14.58 9.65109 14.659 9.46033 14.7997 9.31968C14.9403 9.17902 15.1311 9.10001 15.33 9.10001C15.5289 9.10001 15.7197 9.17902 15.8603 9.31968C16.001 9.46033 16.08 9.65109 16.08 9.85001V14.15C16.08 14.2485 16.0606 14.346 16.0229 14.437C15.9852 14.528 15.93 14.6107 15.8603 14.6803C15.7907 14.75 15.708 14.8052 15.617 14.8429C15.526 14.8806 15.4285 14.9 15.33 14.9Z"
                          fill="#ffffff"
                        ></path>{" "}
                        <path
                          d="M17.93 12.81H15.33C15.1311 12.81 14.9403 12.731 14.7997 12.5903C14.659 12.4497 14.58 12.2589 14.58 12.06C14.58 11.8611 14.659 11.6703 14.7997 11.5297C14.9403 11.389 15.1311 11.31 15.33 11.31H17.93C18.1289 11.31 18.3197 11.389 18.4603 11.5297C18.601 11.6703 18.68 11.8611 18.68 12.06C18.68 12.2589 18.601 12.4497 18.4603 12.5903C18.3197 12.731 18.1289 12.81 17.93 12.81Z"
                          fill="#ffffff"
                        ></path>{" "}
                        <path
                          d="M17.93 10.6H15.33C15.1311 10.6 14.9403 10.521 14.7997 10.3803C14.659 10.2397 14.58 10.0489 14.58 9.85001C14.58 9.65109 14.659 9.46033 14.7997 9.31968C14.9403 9.17902 15.1311 9.10001 15.33 9.10001H17.93C18.1289 9.10001 18.3197 9.17902 18.4603 9.31968C18.601 9.46033 18.68 9.65109 18.68 9.85001C18.68 10.0489 18.601 10.2397 18.4603 10.3803C18.3197 10.521 18.1289 10.6 17.93 10.6Z"
                          fill="#ffffff"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                  <div
                    style={{
                      width: 20,
                      height: 40,
                      marginLeft: 7,
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      viewBox="0 0 64 64"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke-width="3"
                      stroke="#ffffff"
                      fill="none"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M36.66,54.45H8.84A2.5,2.5,0,0,1,6.35,52V12.12A2.49,2.49,0,0,1,8.84,9.63H48.68a2.49,2.49,0,0,1,2.49,2.49v22.4"></path>
                        <line x1="6.35" y1="20.63" x2="51.17" y2="20.63"></line>
                        <line x1="16.46" y1="9.63" x2="16.46" y2="4.63"></line>
                        <line x1="40.42" y1="9.63" x2="40.42" y2="4.63"></line>
                        <circle cx="45.22" cy="45.44" r="12.43"></circle>
                        <polyline points="45.22 36.7 45.22 45.82 49.57 49.16"></polyline>
                      </g>
                    </svg>
                  </div>
                  <div
                    style={{
                      width: 20,
                      height: 40,
                      marginLeft: 7,
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M9 16C9.85038 16.6303 10.8846 17 12 17C13.1154 17 14.1496 16.6303 15 16"
                          stroke="#ffffff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></path>{" "}
                        <path
                          d="M16 10.5C16 11.3284 15.5523 12 15 12C14.4477 12 14 11.3284 14 10.5C14 9.67157 14.4477 9 15 9C15.5523 9 16 9.67157 16 10.5Z"
                          fill="#ffffff"
                        ></path>{" "}
                        <ellipse
                          cx="9"
                          cy="10.5"
                          rx="1"
                          ry="1.5"
                          fill="#ffffff"
                        ></ellipse>{" "}
                        <path
                          d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                          stroke="#ffffff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                  <div
                    style={{
                      width: 20,
                      height: 40,
                      marginLeft: 7,
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#ffffff"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <path
                          d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                          stroke="#ffffff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                        <path
                          d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                          stroke="#ffffff"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>{" "}
                      </g>
                    </svg>
                  </div>
                </div>
                <button
                  className="desktop-new-tweet-btn"
                  disabled={disabled}
                  onClick={handleNewTweetClick}
                >
                  POST
                </button>
              </div>
            </div>
            {tweets.length > 0 ? tweetsDisplay : null}
            <div className="no-more-tweets">No more tweets</div>
          </div>
          <NewTweetButton />
          {optionsDisplay === false ? null : (
            <TweetOptions
              handleOptionsView={handleOptionsView}
              tweet={tweetOptions}
              handleDeleteTweet={handleDeleteTweet}
            />
          )}
          {optionsDisplay || shareDisplay ? <Overlay /> : null}
          {shareDisplay === false ? null : (
            <ShareTweet
              tweet={tweetShare.tweet}
              user={tweetShare.user}
              activeUser={activeUser}
              handleShareView={handleShareView}
              handleBookmark={handleBookmark}
              handleRemoveBookmark={handleRemoveBookmark}
            />
          )}
        </main>
        <MobileFooterMenu page="home" />
      </div>
    </div>
  );
};

export default Home;
