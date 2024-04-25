import React from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  InstapaperShareButton,
  InstapaperIcon,
} from "react-share";
import styles from "./styles.module.scss";
import { HiShare } from "react-icons/hi";

export default function Share({ post }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post.name,
          url: window.location.href,
        })
        .then(() => {
          console.log("Shared successfully");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      // Fallback to traditional share link
      console.log(
        "Share API not supported, fallback to traditional share link"
      );
      // You can implement your own share functionality here
    }
  };
  return (
    <>
      <div className={styles.share}>
        <span onClick={handleShare}>
          <HiShare
            className="text-[2.4rem] text-center bg-[#c9454b] p-2 text-gray-100"
            title="share"
            post={post}
          />{" "}
          {/* <p className="text-[1rem] mt-2 text-center">Share</p> */}
        </span>
        {/* <InstapaperShareButton url={window?.location.href}>
        <InstapaperIcon size={38} />
      </InstapaperShareButton> */}
        <FacebookShareButton url={window?.location.href}>
          <FacebookIcon size={38} />
        </FacebookShareButton>
        {/* <FacebookMessengerShareButton url={window?.location.href}>
        <FacebookMessengerIcon size={38} />
      </FacebookMessengerShareButton> */}
        <TwitterShareButton url={window?.location.href}>
          <TwitterIcon size={38} />
        </TwitterShareButton>
        {/* <LinkedinShareButton url={window?.location.href}>
        <LinkedinIcon size={38} />
      </LinkedinShareButton> */}
        {/* <RedditShareButton url={window?.location.href}>
        <RedditIcon size={38} />
      </RedditShareButton> */}
        <TelegramShareButton url={window?.location.href}>
          <TelegramIcon size={38} />
        </TelegramShareButton>
        <WhatsappShareButton url={window?.location.href}>
          <WhatsappIcon size={38} />
        </WhatsappShareButton>
        <PinterestShareButton url={window?.location.href}>
          <PinterestIcon size={38} />
        </PinterestShareButton>
        <EmailShareButton url={window?.location.href}>
          <EmailIcon size={38} />
        </EmailShareButton>
      </div>
    </>
  );
}
